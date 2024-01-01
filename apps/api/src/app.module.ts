import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { paymentsModule } from './payments/payments.module';
@Module({
  imports: [UsersModule, paymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
