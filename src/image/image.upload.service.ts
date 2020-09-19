import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

import { DBConnService } from 'src/db/db.conn.service';

import { UserSession } from 'src/db/entity/UserSession';
import { Image } from 'src/db/entity/Image';
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

  async uploadNewUserImage(
    session: UserSession,
    file: Express.Multer.File,
  ): Promise<string> {
    const imageId = await generateUUID();

    const params = {
      Body: file.buffer,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `user/${imageId}`,
      ContentType: file.mimetype,
    };

    const data = await this.s3
      .upload(params) // upload callback parameter not working properly
      .promise()
      .catch(err => {
        console.log(err);
        throw new NotFoundException(err.message);
      });

    console.log(data);

    await this.conn.getConn().transaction(async mgr => {
      const image = new Image();
    });

    return imageId;
  }
}
