import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import { setSwagger, setValidation } from '@app/common';
import { resolve } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  console.log('Storage service is starting...');
  const app = await NestFactory.create<NestExpressApplication>(StorageModule);
  setSwagger(app);
  setValidation(app);
  app.enableCors();
  app.useStaticAssets(resolve('public'));
  // await app.startAllMicroservices();
  await app.listen(4001);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { StorageModule } from './storage.module';

// async function bootstrap() {
//   const app = await NestFactory.create(StorageModule);
//   await app.startAllMicroservices();
//   await app.listen(80);
// }
// bootstrap();
