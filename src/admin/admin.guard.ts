import { CanActivate, ExecutionContext } from '@nestjs/common';

import { DBConnService } from 'src/db/db.conn.service';
import { AdminUserSession } from 'src/db/entity/AdminUserSession';

export class AdminGuard implements CanActivate {
  constructor(private conn: DBConnService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context
      .switchToHttp()
      .getRequest()
      .header('api-token');

    const session = await this.conn.getConn().transaction(async mgr => {
      return await mgr.findOne(AdminUserSession, {
        where: { token },
        relations: ['user'],
      });
    });

    if (!session) return false;

    context.switchToHttp().getRequest().session = session;

    return true;
  }
}
