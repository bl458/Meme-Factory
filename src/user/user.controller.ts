import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';

import { User } from 'src/db/entity/User';

import { EmailPipe } from 'src/helper/pipes/EmailPipe';
import { PasswordPipe } from 'src/helper/pipes/PasswordPipe';

@Controller()
export class UserController {
  constructor(private uService: UserService) {}

  @Post('user')
  async signup(
    @Body('email', EmailPipe) email: string,
    @Body('pw', PasswordPipe) pw: string,
  ): Promise<User> {
    return await this.uService.createUser(email, pw);
  }
}
