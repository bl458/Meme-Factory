import { Module } from '@nestjs/common';

import { DBModule } from 'src/db/db.module';

import { ImageController } from './image.controller';

import { ImageService } from './image.service';

@Module({
  imports: [DBModule],
  exports: [ImageService],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
