import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { GatewayModule } from './gateway.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('GATEWAY', true));
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.startAllMicroservices();
  await app.listen(80);
}
bootstrap();
