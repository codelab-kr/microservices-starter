import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  await app.startAllMicroservices();
  await app.listen(80);
}
bootstrap();
