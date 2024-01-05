import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Payments service is starting...');
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(PaymentsModule);
  await app.listen();
}
bootstrap();
