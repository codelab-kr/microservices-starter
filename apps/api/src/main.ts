import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setSwagger, setSession, setValidation, setHbs } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register(),
  );

  const conf = app.get(ConfigService);

  setSwagger(app);
  setValidation(app);

  const port = conf.get('PORT') ?? 4000;
  const sessionAuth = conf.get('SESSION_AUTH');
  const baseUrl = conf.get('BASE_URL');

  if (sessionAuth) setSession(app);
  setHbs(app);

  app.enableCors();

  await app.listen(port, () =>
    console.log(
      `Listening on ${baseUrl} 🚀 \nRedis Session Auth is ${sessionAuth} `,
    ),
  );
}
bootstrap();
