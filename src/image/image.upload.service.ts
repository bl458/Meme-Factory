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

const MAX_IMG_SIZE = 3 * 1024 * 1024; // 3MB

@Injectable()
export class ImageUploadService {
  private s3: AWS.S3;

  constructor(private conn: DBConnService) {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY_ID,
      region: process.env.AWS_REGION,
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
