import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';

import { ImageUploadService } from './image.upload.service';

@Controller()
export class ImageUploadController {
  constructor(private readonly iuService: ImageUploadService) {}

  @Post('image/upload')
  async uploadNewImage(
    @Req() request: any,
    @Res() response: any,
  ): Promise<void> {
    await this.iuService.uploadNew(request, response);
  }
}
