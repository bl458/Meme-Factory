import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MoreThan } from 'typeorm';

import { DBConnService } from 'src/db/db.conn.service';

import { UserSession } from 'src/db/entity/UserSession';

const TOKEN_EXPIRY = 1000 * 60 * 60 * 30; // 30 min

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private conn: DBConnService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context
      .switchToHttp()
      .getRequest()
      .header('api-token');

    const session = await this.conn.getConn().transaction(async mgr => {
      return await mgr.findOne(UserSession, {
        where: { token, createdAt: MoreThan(Date.now() - TOKEN_EXPIRY) },
        relations: ['user'],
      });
    });

    if (!session) return false;

    context.switchToHttp().getRequest().session = session;

    return true;
  }
}
