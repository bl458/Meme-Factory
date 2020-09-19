import {
  Controller,
  UseGuards,
  Session,
  Req,
  Res,
  BadRequestException,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { UserGuard } from './user.guard';

import { ImageUploadService } from 'src/image/image.upload.service';

import { UserSession } from 'src/db/entity/UserSession';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(UserGuard)
@Controller()
export class UserImageController {
  constructor(private iuService: ImageUploadService) {}

  @Post('user/image')
  @UseInterceptors(FileInterceptor('file'))
  async saveNewImage(
    @Session() session: UserSession,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    if (!file) throw new BadRequestException('no file');
    if (!file.mimetype.includes('image/'))
      throw new BadRequestException('file has to be an image');

    return await this.iuService.uploadNewUserImage(session, file);
  }
}
