import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { Image } from 'src/db/entity/Image';

@Controller()
export class AdminImageController {
  @Post('admin/images')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Image[]> {
    console.log(files);
    return;
  }
}
