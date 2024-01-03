import { NestFactory } from '@nestjs/core';
import { HistoryModule } from './history.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('History service is starting...');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    HistoryModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats'],
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
