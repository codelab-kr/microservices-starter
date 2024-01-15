import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  setSwagger,
  setSession,
  setGlobal,
  setValidation,
  setHbs,
} from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register(),
  );

  setGlobal(app);
  setSwagger(app);
  setValidation(app);

  const port = global[Symbol.for('port')] ?? 4000;
  const sessionAuth = global[Symbol.for('sessionAuth')];
  const baseUrl = global[Symbol.for('baseUrl')];

  if (sessionAuth) setSession(app);
  setHbs(app);

  await app.listen(port, () =>
    console.log(
      `Listening on ${baseUrl} 🚀 \nRedis Session Auth is ${sessionAuth} `,
    ),
  );
}
bootstrap();
