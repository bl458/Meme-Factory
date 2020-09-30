import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  if (process.env.LOAD_ENV === 'YES')
    dotenv.config({ path: __dirname + '/.env' });

  await app.listen(8000);
}
bootstrap();
