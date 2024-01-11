import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsResolver } from './payments.resolver';
import { NATS_SERVICE, NatsClientService } from '@app/common';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsResolver,
    {
      provide: NATS_SERVICE,
      useClass: NatsClientService,
    },
  ],
})
export class PaymentsModule {}
