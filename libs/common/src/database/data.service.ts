import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { ConfigService as ConfigServiceOrigin } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService | ConfigServiceOrigin) {}

  dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host:
      this.configService.get('NODE_ENV') in ['migration', 'development']
        ? 'localhost'
        : this.configService.get('DB_HOST'),
    port: parseInt(this.configService.get('DB_PORT')) || 3306,
    username: this.configService.get('DB_USERNAME'),
    password: this.configService.get('DB_PASSWORD'),
    database: this.configService.get('DB_NAME'),
    entities: ['./dist/apps/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging:
      this.configService.get('NODE_ENV') in ['production']
        ? ['error']
        : ['error', 'query', 'schema'],
    migrationsTableName: 'migrations',
  };

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('this.dataSourceOptions: ', this.dataSourceOptions);
    return this.dataSourceOptions;
  }
}
