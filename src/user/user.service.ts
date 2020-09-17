import { Injectable, BadRequestException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { DBConnService } from 'src/db/db.conn.service';
import { AuthService } from 'src/auth/auth.service';

import { User } from 'src/db/entity/User';

@Injectable()
export class UserService {
  constructor(private conn: DBConnService, private auth: AuthService) {}

  async createUser(email: string, pw: string): Promise<User> {
    return await this.conn.getConn().transaction(async mgr => {
      const user = new User();
      user.email = email;
      user.pw = await this.auth.hashPw(pw);
      user.images = [];

      try {
        await mgr.save(user);
      } catch (err) {
        if (err instanceof QueryFailedError)
          throw new BadRequestException('email already exists');

        throw err;
      }

      return user;
    });
  }
}
