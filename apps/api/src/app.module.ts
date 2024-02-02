import { DynamicModule, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { JwtAuthModule, SessionAuthModule, ExceptionModule } from '@app/common';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { HistoryModule } from './history/history.module';
import * as path from 'path';
import * as Joi from 'joi';

@Module({})
export class AppModule {
  static register(): DynamicModule {
    const configService = new ConfigService();
    const module = AppModule;
    const sessionAuth = configService.get('SESSION_AUTH');

    const imports = [
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: './apps/api/src/schema.gql',
      }),
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          SERVICE_NAME: Joi.string().required(),
          SESSION_AUTH: Joi.boolean().required(),
        }),
        cache: true,
        envFilePath: '/.api.env',
      }),
      ServeStaticModule.forRoot({
        rootPath: path.resolve('public'),
      }),
      ExceptionModule,
      UsersModule,
      VideosModule,
      HistoryModule,
      PaymentsModule,
    ];
    let AuthModule: any;
    if (sessionAuth) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      AuthModule = SessionAuthModule;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      AuthModule = JwtAuthModule;
    }
    imports.push(AuthModule);
    const controllers = [AppController];
    const providers = [AppService];

    return {
      module,
      imports,
      controllers,
      providers,
    };
  }
}
