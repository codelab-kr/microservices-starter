import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('STORAGE'));

  await app.startAllMicroservices();
  await app.listen(80);
}
bootstrap();
