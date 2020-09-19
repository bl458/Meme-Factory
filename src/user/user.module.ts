import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserSessionController } from './user.session.controller';
import { UserImageController } from './user.image.controller';

import { UserService } from './user.service';
import { UserSessionService } from './user.session.service';

import { AuthModule } from 'src/auth/auth.module';
import { DBModule } from 'src/db/db.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [AuthModule, DBModule, ImageModule],
  controllers: [UserController, UserSessionController, UserImageController],
  providers: [UserService, UserSessionService],
})
export class UserModule {}
