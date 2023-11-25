import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { Star } from '../../../../apps/stars/src/star.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {
    // console.log('this.configService: ', this.configService);
    // console.log(
    //   'this.configService: ',
    //   this.configService.get('RABBIT_MQ_STAR_QUEUE'),
    // );
    console.log('__dirname: ', __dirname);
  }

  dataSourceOptions: DataSourceOptions = {
    type: this.configService.get<string>('DB_TYPE') ?? ('mysql' as any),
    host:
      this.configService.get<string>('NODE_ENV') === 'test'
        ? 'localhost'
        : this.configService.get<string>('DB_HOST'),
    port: parseInt(this.configService.get('DB_PORT')) || 3306,
    username: this.configService.get<string>('DB_USERNAME'),
    password: this.configService.get<string>('DB_PASSWORD'),
    database: this.configService.get<string>('DB_NAME'),
    // entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    entities: [Star],
    synchronize: false,
    logging:
      this.configService.get<string>('NODE_ENV') === 'production'
        ? ['error']
        : ['error', 'query', 'schema'],
    // migrations: ['./*.ts'],
    migrationsTableName: 'migrations',
  };

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('this.dataSourceOptions: ', this.dataSourceOptions);
    return this.dataSourceOptions;
  }
}
