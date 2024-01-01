import { Module } from '@nestjs/common';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { paymentsController } from './payments.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [paymentsController],
  providers: [],
})
export class paymentsModule {}
