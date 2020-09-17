import { Controller, Post, Req, Res } from '@nestjs/common';

import { ImageUploadService } from './image.upload.service';

@Controller()
export class ImageUploadController {
  constructor(private readonly iuService: ImageUploadService) {}

  @Post('image/upload')
  async uploadNewImage(@Req() request, @Res() response): Promise<void> {
    await this.iuService.uploadNew(request, response);
  }
}
