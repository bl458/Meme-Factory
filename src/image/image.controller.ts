import { Controller, Param } from '@nestjs/common';
import { Get } from '@nestjs/common';

import { ImageService } from './image.service';

import { Image } from 'src/db/entity/Image';

@Controller()
export class ImageController {
  constructor(private iService: ImageService) {}

  @Get('images/feed/:seed/:page')
  // Same seed means same query result
  async getImagesFeed(
    @Param('seed') seed: number,
    @Param('page') page: number,
  ): Promise<Image[]> {
    return await this.iService.fetchImagesFeed(seed, page);
  }
}
