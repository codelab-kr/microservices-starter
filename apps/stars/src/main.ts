import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/common';
import { StarsModule } from './stars.module';

async function bootstrap() {
  const app = await NestFactory.create(StarsModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.startAllMicroservices();
  await app.listen(80);
}
bootstrap();
