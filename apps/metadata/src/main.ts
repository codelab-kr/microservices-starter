import { NestFactory } from '@nestjs/core';
import { MetadataModule } from './metadata.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(MetadataModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('METADATA'));
  await app.startAllMicroservices();
}
bootstrap();
