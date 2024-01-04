import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsResolver } from './payments.resolver';
import { NatsClientModule } from '@app/common';

@Module({
  imports: [NatsClientModule],
  controllers: [PaymentsController],
  providers: [PaymentsResolver],
})
export class PaymentsModule {}
