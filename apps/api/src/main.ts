import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as session from 'express-session';
import * as passort from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(path.resolve('public/views'));
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );
  app.use(passort.initialize());
  app.use(passort.session());
  setupSwagger(app);
  const PORT = configService.get('port') ?? 4000;
  await app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}
bootstrap();
