import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageUploadService {
  s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY_ID,
      region: process.env.AWS_REGION,
    });
  }

  async uploadNew(req: any, res: any) {
    const upload = multer({
      storage: multerS3({
        s3: this.s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function(request, file, cb) {
          cb(null, `${Date.now().toString()} - ${file.originalname}`);
        },
      }),
    }).array('upload', 1);

    try {
      upload(req, res, function(error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        console.log('Request: ', req);
        console.log('Response: ', res);
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }
}
