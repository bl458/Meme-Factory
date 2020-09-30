import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';

import { DBConnService } from 'src/db/db.conn.service';

import { UserSession } from 'src/db/entity/UserSession';
import { AdminUserSession } from 'src/db/entity/AdminUserSession';
import { Image } from 'src/db/entity/Image';
import { User } from 'src/db/entity/User';

import { generateUUID } from 'src/helper/Misc';

const MAX_IMG_SIZE = 8 * 1024 * 1024; // 8MB
const PAGE_SIZE = 2; // Num of images frontend can fetch each api call
const CACHE_DURATION = 3600000; // Image data remains in cache for 1 hour

@Injectable()
export class ImageService {
  private s3: AWS.S3;

  constructor(private conn: DBConnService) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY_ID,
      region: process.env.AWS_REGION,
    });
  }

  // No need to worry about page value too big (page >= 1)
  async fetchImagesFeed(seed: number, pageNo: number): Promise<Image[]> {
    return await this.conn.getConn().transaction(async mgr => {
      const unprocessedData = await mgr
        .createQueryBuilder(Image, 'image')
        .select(['image.id', 'image.name', 'image.url', 'image.createdAt'])
        // UNIX_TIMESTAMP(DATE) converts date to seconds from 1970-01-01, 3days = 259200sec
        // Images in semi-random order. Recently added images have higher chance of being on top of feed
        .orderBy(
          `UNIX_TIMESTAMP(image.createdAt) + rand(${seed}) * 259200`,
          'DESC',
        )
        .cache(CACHE_DURATION)
        .getMany();

      return unprocessedData.slice(
        (pageNo - 1) * PAGE_SIZE,
        (pageNo - 1) * PAGE_SIZE + PAGE_SIZE,
      );
    });
  }

  async uploadNewImage(
    session: UserSession | AdminUserSession,
    file: Express.Multer.File,
  ): Promise<Image> {
    //Using sharp b/c app might need resizing image in the future
    const imgSharp = sharp(file.buffer);
    const imgMetaData = await imgSharp.metadata();
    if (imgMetaData.size > MAX_IMG_SIZE)
      throw new BadRequestException('image too big');

    const imgId = await generateUUID();

    // key is location of img in aws s3
    const key =
      session instanceof UserSession ? `user/${imgId}` : `admin/${imgId}`;

    const params = {
      Body: file.buffer,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: file.mimetype,
    };

    const imgObj = await this.s3
      .upload(params) // upload callback parameter not working properly
      .promise()
      .catch(err => {
        console.log(err);
        throw new NotFoundException(err.message);
      });

    return await this.conn.getConn().transaction(async mgr => {
      const image = new Image();

      image.name = file.originalname;
      image.size = imgMetaData.size;
      image.width = imgMetaData.width;
      image.height = imgMetaData.height;
      image.url = imgObj.Location; // Location contains imgId variable

      if (session.user instanceof User) {
        image.user = session.user;
      } else {
        image.admin = session.user;
      }

      await mgr.save(image);

      return image;
    });
  }
}
