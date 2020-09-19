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
  ): Promise<void> {
    console.log(file);
    // if (
    //   !request.headers['content-type'] ||
    //   !request.headers['content-type'].includes('multipart/form-data')
    // )
    //   throw new BadRequestException('only multipart/form-data allowed');
    // await this.iuService.uploadNew(session, request, response);
  }
}
