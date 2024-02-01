import { Module } from '@nestjs/common';
import { PostsRepository } from './repositories/posts.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmExModule, MysqlModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostsResolver } from './resolvers/posts.resolver';
import { PostSettingResolver } from './resolvers/post.settings.resolver';
import { PostSettingsRepository } from './repositories/post.settings.repository';
import { PostSettingsService } from './post.settings.service';
import * as Joi from 'joi';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './apps/posts/src/models/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmExModule.forCustomRepository([
      PostsRepository,
      PostSettingsRepository,
    ]),
    MysqlModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostSettingsService,
    PostsResolver,
    PostSettingResolver,
  ],
})
export class PostsModule {}
