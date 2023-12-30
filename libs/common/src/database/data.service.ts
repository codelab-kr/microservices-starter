import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { ConfigService as ConfigServiceOrigin } from '@nestjs/config';
import * as os from 'os';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private configService: ConfigService | ConfigServiceOrigin,
    private readonly nodeEnv = process.env.NODE_ENV ??
      configService.get('NODE_ENV') ??
      'development',
  ) {}

  get dataSourceOptions(): DataSourceOptions {
    return {
      type: 'mysql',
      host: os.platform() === 'linux' ? process.env.DB_HOST : 'localhost',
      port: parseInt(this.configService.get('DB_PORT')) || 3306,
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      entities: ['./dist/apps/**/models/*{.ts,.js}'],
      synchronize: ['production'].includes(this.nodeEnv) ? false : true,
      logging: ['production'].includes(this.nodeEnv)
        ? ['error']
        : ['error', 'query', 'schema'],
      migrationsTableName: 'migrations',
    };
  }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('this.dataSourceOptions: ', this.dataSourceOptions);
    return this.dataSourceOptions;
  }
}
