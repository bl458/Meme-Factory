import { Controller, Post, Body, Delete, Session } from '@nestjs/common';

import { UserSession } from 'src/db/entity/UserSession';

import { EmailPipe } from 'src/helper/pipes/EmailPipe';
import { PasswordPipe } from 'src/helper/pipes/PasswordPipe';

@Controller()
export class UserSessionController {
  @Post('us')
  async login(
    @Body('email', new EmailPipe()) email: string,
    @Body('pw', new PasswordPipe()) pw: string,
  ): Promise<string> {
    return;
  }

  @Delete('us')
  async logout(@Session() us: UserSession): Promise<void> {
    return;
  }
}
