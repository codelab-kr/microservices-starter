import { NestFactory } from '@nestjs/core';
import { VideosModule } from './videos.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Videos service is starting...');
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(VideosModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
