import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  dataSourceOptions: DataSourceOptions = {
    type: this.configService.get('DB_TYPE') as any,
    host: this.configService.isEnv('development')
      ? this.configService.get('DB_HOST')
      : 'localhost',
    port: parseInt(this.configService.get('DB_PORT')) || 3306,
    // port: this.configService.isEnv('localhost')
    // ? parseInt(this.configService.get('DB_HOST_PORT'))
    // : parseInt(this.configService.get('DB_CONTAINER_PORT')) || 3306,
    username: this.configService.get('DB_USERNAME'),
    password: this.configService.get('DB_PASSWORD'),
    database: this.configService.get('DB_NAME'),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    // entities: [__dirname + '/../api/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging:
      this.configService.isEnv('development') ||
      this.configService.isEnv('localhost'),
    // logging: true,
    // logging: this.configService.isEnv('production')
    //   ? ['error']
    //   : ['error', 'query', 'schema'],
    migrations: ['./*.ts'],
    migrationsTableName: 'migrations',
  };

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.dataSourceOptions;
  }
}
