import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger, setupSession } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

const BaseUrl = Symbol.for('BaseUrl');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') ?? 4000;
  const session = configService.get('SESSION'); // boolean type

  global[BaseUrl] =
    configService.get('NODE_ENV') === 'production'
      ? configService.get('BASE_URL')
      : `http://localhost:${port}`;

  if (session) setupSession(app);
  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(path.resolve('public/views'));
  app.setViewEngine('hbs');

  await app.listen(port, async () => {
    console.log(
      `Listening on ${global[BaseUrl]} 🚀 \nRedis Session Set is ${session} `,
    );
  });
}
bootstrap();
