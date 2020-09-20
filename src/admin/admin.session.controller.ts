import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { AdminSessionService } from './admin.session.service';

import { EmailPipe } from 'src/helper/pipes/EmailPipe';
import { PasswordPipe } from 'src/helper/pipes/PasswordPipe';
import { TokenPipe } from 'src/helper/pipes/TokenPipe';

@Controller()
export class AdminSessionController {
  constructor(private asService: AdminSessionService) {}

  @Post('admin/session')
  async login(
    @Body('email', EmailPipe) email: string,
    @Body('pw', PasswordPipe) pw: string,
  ): Promise<string> {
    return await this.asService.doLogin(email, pw);
  }

  @Delete('admin/session/:token')
  async logout(@Param('token', TokenPipe) token: string): Promise<void> {
    await this.asService.doLogout(token);
  }
}
