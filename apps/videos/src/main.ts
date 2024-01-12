import { NestFactory } from '@nestjs/core';
import { VideosModule } from './videos.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('Videos service is starting...');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    VideosModule,
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
