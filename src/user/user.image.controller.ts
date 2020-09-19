import {
  Controller,
  UseGuards,
  Session,
  Req,
  Res,
  BadRequestException,
  Post,
} from '@nestjs/common';

import { UserGuard } from './user.guard';

import { ImageUploadService } from 'src/image/image.upload.service';

import { UserSession } from 'src/db/entity/UserSession';

const MAX_IMG_SIZE = 3 * 1024 * 1024; // 3MB

@UseGuards(UserGuard)
@Controller()
export class UserImageController {
  constructor(private iuService: ImageUploadService) {}

  @Post('user/image')
  async saveNewImage(
    @Session() session: UserSession,
    @Req() request: any,
    @Res() response: any,
  ): Promise<void> {
    if (!request.headers['content-type'].includes('multipart/form-data'))
      throw new BadRequestException('only multipart/form-data allowed');

    if (request.headers['content-length'] > MAX_IMG_SIZE)
      throw new BadRequestException('Image too big');

    await this.iuService.uploadNew(session, request, response);
  }
}
