import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { AuthModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
// import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({}),
    }),
    AuthModule,
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
