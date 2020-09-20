import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MoreThan } from 'typeorm';

import { DBConnService } from 'src/db/db.conn.service';
import { AdminUserSession } from 'src/db/entity/AdminUserSession';

const TOKEN_EXPIRY = 1000 * 60 * 60 * 30;

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private conn: DBConnService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context
      .switchToHttp()
      .getRequest()
      .header('api-token');

    const session = await this.conn.getConn().transaction(async mgr => {
      return await mgr.findOne(AdminUserSession, {
        where: { token, createdAt: MoreThan(Date.now() - TOKEN_EXPIRY) },
        relations: ['user'],
      });
    });

    if (!session) return false;

    context.switchToHttp().getRequest().session = session;

    return true;
  }
}
