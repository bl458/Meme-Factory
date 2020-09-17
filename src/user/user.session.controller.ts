import { Controller, Post, Body, Delete, Param } from '@nestjs/common';

import { UserSessionService } from './user.session.service';

import { EmailPipe } from 'src/helper/pipes/EmailPipe';
import { PasswordPipe } from 'src/helper/pipes/PasswordPipe';
import { TokenPipe } from 'src/helper/pipes/TokenPipe';

@Controller()
export class UserSessionController {
  constructor(private usService: UserSessionService) {}

  @Post('user/session')
  async login(
    @Body('email', new EmailPipe()) email: string,
    @Body('pw', new PasswordPipe()) pw: string,
  ): Promise<string> {
    return await this.usService.doLogin(email, pw);
  }

  @Delete('user/session')
  async logout(@Param('token', new TokenPipe()) token: string): Promise<void> {
    return await this.usService.doLogout(token);
  }
}
