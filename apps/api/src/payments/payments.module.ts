import { Module } from '@nestjs/common';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { PaymentsController } from './payments.controller';
import { PaymentsResolver } from './payments.resolver';

@Module({
  imports: [NatsClientModule],
  controllers: [PaymentsController],
  providers: [PaymentsResolver],
})
export class PaymentsModule {}
