import { Injectable, BadRequestException } from '@nestjs/common';

import { DBConnService } from 'src/db/db.conn.service';
import { AuthService } from 'src/auth/auth.service';

import { UserSession } from 'src/db/entity/UserSession';
import { User } from 'src/db/entity/User';

@Injectable()
export class UserSessionService {
  constructor(private conn: DBConnService, private auth: AuthService) {}

  async doLogin(email: string, pw: string): Promise<string> {
    return await this.conn.getConn().transaction(async mgr => {
      const user = await mgr.findOne(User, { email });

      if (!user) throw new BadRequestException('bad email');
      if (!this.auth.comparePw(pw, user.pw))
        throw new BadRequestException('bad pw');

      const uSession = new UserSession();
      uSession.user = user;

      const token = await this.auth.generateToken();
      uSession.token = token;

      return token;
    });
  }

  async doLogout(token: string): Promise<void> {
    await this.conn.getConn().transaction(async mgr => {
      const uSession = await mgr.findOne(UserSession, { token });

      if (!uSession) throw new BadRequestException('invalid token');

      await mgr.remove(uSession);
    });
  }
}
