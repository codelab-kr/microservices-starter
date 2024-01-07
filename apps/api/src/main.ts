import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(path.resolve('public/views'));
  app.setViewEngine('hbs');

  const redisClient = new Redis(configService.get('REDIS_URL') as string);

  app.use(
    session({
      secret: configService.get('SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 3,
      },
    }),
  );

  setupSwagger(app);
  const PORT = configService.get('port') ?? 4000;
  await app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
bootstrap();
