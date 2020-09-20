import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { DBModule } from 'src/db/db.module';

import { AdminImageController } from './admin.image.controller';
import { AdminSessionController } from './admin.session.controller';

import { AdminSessionService } from './admin.session.service';

@Module({
  imports: [AuthModule, DBModule],
  controllers: [AdminSessionController, AdminImageController],
  providers: [AdminSessionService],
})
export class AdminModule {}
