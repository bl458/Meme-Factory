import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

import { ImageService } from './image.service';

import { Image } from 'src/db/entity/Image';

@Controller()
export class ImageController {
  constructor(private iService: ImageService) {}

  @Get('images')
  async getImages(): Promise<Image[]> {
    return await this.iService.fetchAllImages();
  }
}
