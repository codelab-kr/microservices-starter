import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from '@app/common';
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
    }),
    MongoModule,
    // MongooseModule.forRoot(
    //   'mongodb://root:password123@mongodb-primary:27017/development',
    //   {
    //     connectionName: 'development',
    //   },
    // ),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  controllers: [VideosController],
  providers: [VideosService, VideosRepository],
})
export class VideosModule {}
