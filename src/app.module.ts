import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { DBModule } from './db/db.module';

@Module({
  imports: [AuthModule, ImageModule, UserModule, DBModule],
})
export class AppModule {}
