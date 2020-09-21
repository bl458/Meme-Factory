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

import { AdminImageService } from './admin.image.service';

import { AdminUserSession } from 'src/db/entity/AdminUserSession';
import { Image } from 'src/db/entity/Image';

@UseGuards(AdminGuard)
@Controller()
export class AdminImageController {
  constructor(private aiService: AdminImageService) {}

  @Post('admin/images')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @Session() session: AdminUserSession,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Image[]> {
    if (files.length === 0) throw new BadRequestException('no files');

    return await this.aiService.uploadAdminImages(session, files);
  }
}
