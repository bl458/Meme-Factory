import {
  Controller,
  UseGuards,
  Session,
  BadRequestException,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserGuard } from './user.guard';

import { ImageUploadService } from 'src/image/image.upload.service';

import { UserSession } from 'src/db/entity/UserSession';
import { Image } from 'src/db/entity/Image';

@UseGuards(UserGuard)
@Controller()
export class UserImageController {
  constructor(private iuService: ImageUploadService) {}

  @Post('user/image')
  @UseInterceptors(FileInterceptor('file'))
  async saveNewImage(
    @Session() session: UserSession,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Image> {
    if (!file) throw new BadRequestException('no file');
    if (!file.mimetype.includes('image/'))
      throw new BadRequestException('file has to be an image');

    return await this.iuService.uploadNewImage(session, file);
  }
}
