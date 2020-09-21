import { BadRequestException, Injectable } from '@nestjs/common';

import { ImageUploadService } from 'src/image/image.upload.service';

import { AdminUserSession } from 'src/db/entity/AdminUserSession';
import { Image } from 'src/db/entity/Image';

@Injectable()
export class AdminImageService {
  constructor(private iuService: ImageUploadService) {}

  async uploadAdminImages(
    session: AdminUserSession,
    files: Express.Multer.File[],
  ): Promise<Image[]> {
    let result = [];
    let failed = [];

    for (let i = 0; i < files.length; i++) {
      if (!files[0].mimetype.includes('image/'))
        throw new BadRequestException(`file[${i}] is not an image`);

      try {
        const newImage = await this.iuService.uploadNewImage(session, files[i]);
        result = [...result, newImage];
        console.log(
          `\nUploaded file[${i}] ${files[i].originalname}\n${newImage.url}\n`,
        );
      } catch (err) {
        console.log(`\nFailed to upload file[${i}] ${files[i].originalname}\n`);
        failed = [...failed, `file[${i}] ${files[i].originalname}: ${err}`];
        continue;
      }
    }

    console.log(`Uploaded ${result.length} images!\n`);

    if (failed.length > 1)
      console.log(`Failed to upload ${failed.length} files: \n${failed}`);

    return result;
  }
}
