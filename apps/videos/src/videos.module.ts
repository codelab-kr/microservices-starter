import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  EnhancerModule,
  HttpModule,
  MongoModule,
} from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './models/video';
import { VideosRepository } from './videos.repository';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
      }),
      envFilePath: './apps/videos/.env',
    }),
    EnhancerModule,
    AuthModule,
    MongoModule,
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    HttpModule,
  ],
  controllers: [VideosController],
  providers: [VideosService, VideosRepository],
})
export class VideosModule {}
