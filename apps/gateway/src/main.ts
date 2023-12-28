import { NestFactory } from '@nestjs/core';
import { RmqService, setupSwagger } from '@app/common';
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
  app.setBaseViewsDir(path.resolve('public/views'));
  app.setViewEngine('hbs');
  setupSwagger(app);
  await app.startAllMicroservices();
  await app.listen(80);
}
bootstrap();
