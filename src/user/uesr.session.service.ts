import { Injectable } from '@nestjs/common';
import { DBConnService } from 'src/db/db.conn.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserSessionService {
  constructor(private conn: DBConnService, private auth: AuthService) {}

  async doLogin(email: string, pw: string): Promise<string> {
    return;
  }

  async doLogout(token: string): Promise<void> {
    return;
  }
}
