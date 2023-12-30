import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './data.service';

import { TypeOrmExModule } from '..';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    TypeOrmExModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...new TypeOrmConfigService(configService).dataSourceOptions,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DataModule {}
