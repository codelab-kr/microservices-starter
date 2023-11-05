import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  DatabaseModule,
  EnhancerModule,
  HttpModule,
  RmqModule,
} from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideosRepository } from './videos.repository';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_VIDEOS_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/videos/.env',
    }),
    EnhancerModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    RmqModule,
    AuthModule,
    HttpModule,
  ],
  controllers: [VideosController],
  providers: [VideosService, VideosRepository],
})
export class VideosModule {}
