import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger, setupSession } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register(),
  );
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(path.resolve('public/views'));
  app.setViewEngine('hbs');
  const session = configService.get('SESSION'); // boolean type
  if (session) setupSession(app);
  setupSwagger(app);
  const PORT = configService.get('port') ?? 4000;
  await app.listen(PORT, () => {
    console.log(
      `Listening on port ${PORT} 🚀 \nRedis Session Set is ${session} `,
    );
  });
}
bootstrap();
