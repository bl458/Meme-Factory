import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { DBModule } from 'src/db/db.module';
import { ImageModule } from 'src/image/image.module';

import { AdminSessionController } from './admin.session.controller';
import { AdminImageController } from './admin.image.controller';

import { AdminSessionService } from './admin.session.service';
import { AdminImageService } from './admin.image.service';

@Module({
  imports: [AuthModule, DBModule, ImageModule],
  controllers: [AdminSessionController, AdminImageController],
  providers: [AdminSessionService, AdminImageService],
})
export class AdminModule {}
