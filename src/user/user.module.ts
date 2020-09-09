import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserSessionController } from './user.session.controller';

import { UserService } from './user.service';
import { UserSessionService } from './user.session.service';

@Module({
  controllers: [UserController, UserSessionController],
  providers: [UserService, UserSessionService],
})
export class UserModule {}
