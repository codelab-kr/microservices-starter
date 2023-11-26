import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from '../../libs/common/src/database/data.service';

import * as path from 'path';
import { ConfigService } from '../../libs/common/src/config/config.service';

const ggg = path.resolve(
  // __dirname,
  './',
  // 'apps/stars/src/**/*.entity{.ts,.js}',
);
console.log('ggg: ', ggg);

export const dataSource: DataSource = new DataSource({
  ...new TypeOrmConfigService(new ConfigService('../.env')).dataSourceOptions,
  entities: ['../apps/**/*.entity.ts'],
  migrations: ['../migrations/*.ts'],
});
