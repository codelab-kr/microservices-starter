import { NestFactory } from '@nestjs/core';
import { VideosModule } from './videos.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(VideosModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(80);
}
bootstrap();
