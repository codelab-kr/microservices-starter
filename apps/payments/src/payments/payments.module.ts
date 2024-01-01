import { Module } from '@nestjs/common';
import { PaymentsRepository } from './repositories/payments.repository';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TypeOrmExModule, DataModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PaymentsResolver } from './resolvers/payments.resolver';
import { PaymentSettingResolver } from './resolvers/payment.settings.resolver';
import { PaymentSettingsRepository } from './repositories/payment.settings.repository';
import { PaymentSettingsService } from './payment.settings.service';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './apps/payments/src/payments/models/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/payments/.env',
    }),
    TypeOrmExModule.forCustomRepository([
      PaymentsRepository,
      PaymentSettingsRepository,
    ]),
    DataModule,
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentSettingsService,
    PaymentsResolver,
    PaymentSettingResolver,
  ],
})
export class PaymentsModule {}
