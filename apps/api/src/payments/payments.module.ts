import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsResolver } from './payments.resolver';
import { NATS_SERVICE, NatsClientService } from '@app/common';
import { PaymentsService } from './pyments.sevice';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsResolver,
    {
      provide: NATS_SERVICE,
      useClass: NatsClientService,
    },
    PaymentsService,
  ],
})
export class PaymentsModule {}
