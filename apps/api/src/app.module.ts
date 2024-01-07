import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  AuthModule,
  AuthenticatedGuard,
  EnhancerModule,
  LocalAuthGuard,
  SessionSerializer,
  LocalStrategy,
} from '@app/common';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import * as path from 'path';
import * as Joi from 'joi';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './apps/api/src/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
      }),
      envFilePath: './apps/api/.env',
      cache: true,
      expandVariables: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('public'),
    }),
    AuthModule,
    EnhancerModule,
    UsersModule,
    PaymentsModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [
    LocalAuthGuard,
    AuthenticatedGuard,
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AppModule {}
