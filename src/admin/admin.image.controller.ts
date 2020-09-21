import {
  BadRequestException,
  Controller,
  Post,
  Session,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AdminGuard } from './admin.guard';

import { ImageUploadService } from 'src/image/image.upload.service';
import { AdminUserSession } from 'src/db/entity/AdminUserSession';
import { Image } from 'src/db/entity/Image';

@UseGuards(AdminGuard)
@Controller()
export class AdminImageController {
  constructor(private iuService: ImageUploadService) {}

  @Post('admin/images')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @Session() session: AdminUserSession,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Image[]> {
    if (files.length === 0) throw new BadRequestException('no files');

    let result = [];
    let failed = [];

    for (let i = 0; i < files.length; i++) {
      if (!files[0].mimetype.includes('image/'))
        throw new BadRequestException(`${i}th file is not an image`);

      try {
        const newImage = await this.iuService.uploadNewImage(session, files[i]);
        result = [...result, newImage];
        console.log(
          `\nUploaded file[${i}] ${files[i].originalname}\n${newImage.url}\n`,
        );
      } catch (err) {
        console.log(`\nFailed to upload file[${i}] ${files[i].originalname}\n`);
        failed = [...failed, `${i}th file ${files[i].originalname}: ${err}`];
      }
    }

    if (failed.length > 1) console.log(failed);

    return result;
  }
}
