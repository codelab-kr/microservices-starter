import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from '@app/common';
import { HistoryRepository } from './history.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './models/history';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
      }),
      envFilePath: 'apps/history/.env',
    }),
    MongoModule,
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryRepository],
})
export class HistoryModule {}
