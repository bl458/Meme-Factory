import { Module } from '@nestjs/common';

import { DBModule } from 'src/db/db.module';

import { ImageUploadController } from './image.upload.controller';

import { ImageUploadService } from './image.upload.service';

@Module({
  imports: [DBModule],
  providers: [ImageUploadService],
  controllers: [ImageUploadController],
})
export class ImageModule {}
