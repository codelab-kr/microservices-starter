import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  // RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
// import { RmqService, setupSwagger } from '@app/common';
import { AuthModule } from './auth.module';

async function bootstrap() {
  console.log('Auth service is starting...');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://nats'],
      },
    },
  );
  // const rmqService = app.get<RmqService>(RmqService);
  // app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  // setupSwagger(app);
  // await app.startAllMicroservices();
  await app.listen();
}
bootstrap();
