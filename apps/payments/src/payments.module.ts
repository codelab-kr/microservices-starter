import { Module } from '@nestjs/common';
import { PaymentsRepository } from './repositories/payments.repository';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TypeOrmExModule, MysqlModule, NatsClientModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PaymentsResolver } from './payments.resolver';
import { UsersRepository } from './repositories/users.repository';
import * as Joi from 'joi';

@Module({
  imports: [
    NatsClientModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './apps/payments/src/models/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmExModule.forCustomRepository([PaymentsRepository, UsersRepository]),
    MysqlModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsResolver],
})
export class PaymentsModule {}
