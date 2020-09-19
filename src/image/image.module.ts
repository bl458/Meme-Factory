import { Module } from '@nestjs/common';

import { DBModule } from 'src/db/db.module';

import { ImageUploadService } from './image.upload.service';

@Module({
  imports: [DBModule],
  exports: [ImageUploadService],
  providers: [ImageUploadService],
})
export class ImageModule {}
