import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';

import { ImageService } from './image.service';

import { IntegerPipe } from 'src/helper/pipes/IntegerPipe';

import { Image } from 'src/db/entity/Image';

@Controller()
export class ImageController {
  constructor(private iService: ImageService) {}

  @Get('images/feed/:seed/:page')
  // Same seed means same query result
  async getImagesFeed(
    @Param('seed', new IntegerPipe()) seed: number,
    @Param('page', new IntegerPipe(1)) pageNo: number,
  ): Promise<Image[]> {
    return await this.iService.fetchImagesFeed(seed, pageNo);
  }
}
