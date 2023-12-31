import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/common';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  console.log('Payment service is starting...');
  const app = await NestFactory.create(PaymentModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.startAllMicroservices();
  await app.listen(80);
}
bootstrap();
