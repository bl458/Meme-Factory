import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.LOAD_ENV === 'YES')
    dotenv.config({ path: __dirname + '/.env' });

  await app.listen(3000);
}
bootstrap();
