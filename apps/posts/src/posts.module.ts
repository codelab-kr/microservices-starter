import { Module } from '@nestjs/common';
import { PostsRepository } from './repositories/posts.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmExModule, DataModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostsResolver } from './resolvers/posts.resolver';
import { PostSettingResolver } from './resolvers/post.settings.resolver';
import { PostSettingsRepository } from './repositories/post.settings.repository';
import { PostSettingsService } from './post.settings.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './apps/posts/src/models/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/posts/.env',
    }),
    TypeOrmExModule.forCustomRepository([
      PostsRepository,
      PostSettingsRepository,
    ]),
    DataModule,
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
