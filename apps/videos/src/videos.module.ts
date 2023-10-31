import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { VideosRepository } from './videos.repository';
import { HISTORY_SERVICE } from './constans/services';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required().default(3000),
      }),
      envFilePath: './apps/videos/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    RmqModule.register({ name: HISTORY_SERVICE }),
    AuthModule,
  ],
  controllers: [VideosController],
  providers: [VideosService, VideosRepository],
})
export class VideosModule {}
