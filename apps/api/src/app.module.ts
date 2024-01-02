import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { NatsClientModule } from './nats-client/nats-client.module';
@Module({
  imports: [
    NatsClientModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './apps/api/src/graphql/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api/.env',
    }),
    UsersModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
