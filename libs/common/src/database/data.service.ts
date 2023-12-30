import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as os from 'os';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  get(key: string): string {
    return this.configService.get(key);
  }

  get nodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get dataSourceOptions(): DataSourceOptions {
    return {
      type: 'mysql',
      host: os.platform() === 'linux' ? this.get('DB_HOST') : 'localhost',
      port: this.nodeEnv === 'test' ? 13306 : 3306,
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.nodeEnv === 'test' ? 'test' : this.get('DB_NAME'),
      entities:
        this.nodeEnv === 'test'
          ? ['./apps/**/models/*.ts']
          : ['./dist/apps/**/models/*.js'],
      logging:
        this.nodeEnv === 'production'
          ? ['error']
          : ['error', 'query', 'schema'],
    };
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.dataSourceOptions;
  }
}
