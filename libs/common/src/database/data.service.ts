import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { ConfigService as ConfigServiceOrigin } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService | ConfigServiceOrigin) {}

  private readonly nodeEnv =
    this.configService.get('NODE_ENV') ?? 'development';

  dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: ['migration', 'test'].includes(this.nodeEnv)
      ? 'localhost'
      : this.configService.get('DB_HOST'),
    port: parseInt(this.configService.get('DB_PORT')) || 3306,
    username: this.configService.get('DB_USERNAME'),
    password: this.configService.get('DB_PASSWORD'),
    database: this.configService.get('DB_NAME'),
    entities: ['./dist/apps/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: ['production'].includes(this.nodeEnv)
      ? ['error']
      : ['error', 'query', 'schema'],
    migrationsTableName: 'migrations',
  };

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('this.dataSourceOptions: ', this.dataSourceOptions);
    return this.dataSourceOptions;
  }
}