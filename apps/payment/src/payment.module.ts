import { Module } from '@nestjs/common';
import { PaymentRepository } from './repositories/payment.repository';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmExModule, DataModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PaymentResolver } from './resolvers/payment.resolver';
import { PaymentettingResolver } from './resolvers/payment.settings.resolver';
import { PaymentettingsRepository } from './repositories/payment.settings.repository';
import { PaymentettingsService } from './payment.settings.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './apps/payment/src/models/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/payment/.env',
    }),
    TypeOrmExModule.forCustomRepository([
      PaymentRepository,
      PaymentettingsRepository,
    ]),
    DataModule,
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentettingsService,
    PaymentResolver,
    PaymentettingResolver,
  ],
})
export class PaymentModule {}
