import { CanActivate, ExecutionContext } from '@nestjs/common';

export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
