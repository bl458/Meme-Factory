import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserSessionController } from './user.session.controller';

import { UserService } from './user.service';
import { UserSessionService } from './user.session.service';

import { AuthModule } from 'src/auth/auth.module';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [AuthModule, DBModule],
  controllers: [UserController, UserSessionController],
  providers: [UserService, UserSessionService],
})
export class UserModule {}
