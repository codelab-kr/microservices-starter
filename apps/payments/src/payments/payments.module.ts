import { Module } from '@nestjs/common';
import { PaymentsRepository } from './repositories/payments.repository';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TypeOrmExModule, DataModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PaymentsResolver } from './resolvers/payments.resolver';
import { NatsClientModule } from '@app/common';
import { UsersRepository } from './repositories/users.repository';
import * as Joi from 'joi';

@Module({
  imports: [
    NatsClientModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './apps/payments/src/payments/models/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
      }),
      envFilePath: './apps/payments/.env',
    }),
    TypeOrmExModule.forCustomRepository([PaymentsRepository, UsersRepository]),
    DataModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsResolver],
})
export class PaymentsModule {}
