import { DataSource } from 'typeorm';
import { ConfigService, TypeOrmConfigService } from '../../libs/common/src';

export const dataSource: DataSource = new DataSource({
  ...new TypeOrmConfigService(new ConfigService('../.env')).dataSourceOptions,
  entities: ['../apps/**/models/*.ts'],
  migrations: ['../migrations/*.ts'],
});
