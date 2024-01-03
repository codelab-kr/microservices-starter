import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './auth/users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { NatsClientModule } from './nats-client/nats-client.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule, EnhancerModule } from '@app/common';
import { AppController } from './app.controller';
import * as cookieParser from 'cookie-parser';
import * as Joi from 'joi';
@Module({
  imports: [
    NatsClientModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './apps/api/src/graphql/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
      }),
      envFilePath: './apps/api/.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('public'),
    }),
    AuthModule,
    EnhancerModule,
    UsersModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
