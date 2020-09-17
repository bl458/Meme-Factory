import {
  BadRequestException,
  Controller,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';

import { UserGuard } from 'src/user/user.guard';

import { ImageUploadService } from './image.upload.service';

import { UserSession } from 'src/db/entity/UserSession';

const MAX_SIZE = 3 * 1024 * 1024; // 3MB

@UseGuards(UserGuard)
@Controller()
export class ImageUploadController {
  constructor(private readonly iuService: ImageUploadService) {}

  @Post('image/upload')
  async uploadNewImage(
    @Session() session: UserSession,
    @Req() request: any,
    @Res() response: any,
  ): Promise<void> {
    if (!request.headers['content-type'].includes('multipart/form-data'))
      throw new BadRequestException('only multipart/form-data allowed');

    if (request.headers['content-length'] > MAX_SIZE)
      throw new BadRequestException('Image too big');

    await this.iuService.uploadNew(session, request, response);
  }
}
