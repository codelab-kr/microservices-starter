import { DataSource } from 'typeorm';
import { ConfigService, TypeOrmConfigService } from '../../libs/common/src';
// import { TypeOrmConfigService, ConfigService } from '@app/common';
// import * as path from 'path';

// const curruntPath = path.resolve('./');
// console.log('curruntPath', curruntPath);

export const dataSource: DataSource = new DataSource({
  ...new TypeOrmConfigService(new ConfigService('../.env')).dataSourceOptions,
  entities: ['../apps/**/*.entity.ts'],
  migrations: ['../migrations/*.ts'],
});
