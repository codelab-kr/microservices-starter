import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as os from 'os';

/**
 * 테스트 MySQL 가져오기
 *
 * @returns {DynamicModule}
 */
export function getTestMysqlModule(): DynamicModule {
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: os.platform() === 'linux' ? process.env.DB_HOST : 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: ['./dist/apps/**/models/*{.ts,.js}'],
    synchronize: true,
    logging: ['error', 'query', 'schema'],
  });
}
