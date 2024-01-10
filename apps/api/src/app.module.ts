import { DynamicModule, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import {
  JwtAuthModule,
  SessionAuthModule,
  EnhancerModule,
  // AuthServiceFactory,
} from '@app/common';
import * as path from 'path';
import * as Joi from 'joi';

@Module({})
export class AppModule {
  static register(): DynamicModule {
    const configService = new ConfigService();
    const module = AppModule;
    const session = configService.get('SESSION') === 'true';
    const imports = [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: './apps/api/src/schema.gql',
      }),
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          SERVICE_NAME: Joi.string().required(),
          SESSION: Joi.boolean().required(),
        }),
        envFilePath: './apps/api/.env',
        cache: true,
        expandVariables: true,
      }),
      ServeStaticModule.forRoot({
        rootPath: path.resolve('public'),
      }),
      EnhancerModule,
      UsersModule,
      PaymentsModule,
    ];
    let AuthModule: any;
    if (session) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      AuthModule = SessionAuthModule;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      AuthModule = JwtAuthModule;
    }
    imports.push(AuthModule);
    const controllers = [AppController];
    // const providers = [AuthServiceFactory];

    return {
      module,
      imports,
      controllers,
      // providers,
    };
  }
}
