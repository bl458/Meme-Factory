import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AdminGuard } from './admin.guard';

import { Image } from 'src/db/entity/Image';

@UseGuards(AdminGuard)
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
