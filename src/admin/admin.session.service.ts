import { BadRequestException, Injectable } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { DBConnService } from 'src/db/db.conn.service';

import { AdminUser } from 'src/db/entity/AdminUser';
import { AdminUserSession } from 'src/db/entity/AdminUserSession';

@Injectable()
export class AdminSessionService {
  constructor(private conn: DBConnService, private auth: AuthService) {}

  async doLogin(email: string, pw: string): Promise<string> {
    return await this.conn.getConn().transaction(async mgr => {
      // Didnt use select options b/c might need all columns later
      const user = await mgr.findOne(AdminUser, { email });

      if (!user) throw new BadRequestException('bad admin email');
      if (!(await this.auth.comparePw(pw, user.pw)))
        throw new BadRequestException('bad admin pw');

      const prevSession = await mgr.findOne(AdminUserSession, {
        select: ['id'],
        where: { user },
      });

      if (prevSession) await mgr.remove(prevSession);

      const newSession = new AdminUserSession();
      const token = await this.auth.generateToken();

      newSession.user = user;
      newSession.token = token;

      await mgr.save(newSession);

      return token;
    });
  }

  async doLogout(token: string): Promise<void> {
    await this.conn.getConn().transaction(async mgr => {
      const session = await mgr.findOne(AdminUserSession, {
        select: ['id'],
        where: { token },
      });

      if (!session) throw new BadRequestException('bad token');

      await mgr.remove(session);
    });
  }
}
