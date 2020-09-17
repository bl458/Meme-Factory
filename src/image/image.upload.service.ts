import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
});

@Injectable()
export class ImageUploadService {
  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: (request, file, cb) => {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).array('upload', 1);

  async uploadNew(req, res): Promise<void> {
    console.log(AWS_S3_BUCKET_NAME);
    try {
      this.upload(req, res, err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
