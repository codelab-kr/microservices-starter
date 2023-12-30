import { Module } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmExModule, DataModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PostsResolver } from './post.resolver';
import { PostSettingResolver } from './post.settings.resolver';

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
    TypeOrmExModule.forCustomRepository([PostsRepository]),
    DataModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsResolver, PostSettingResolver],
})
export class PostsModule {}
