import { DataSource } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { TypeOrmConfigService } from './database.service';

// for typeorm migration
export const dataSource: DataSource = new DataSource(
  new TypeOrmConfigService(new ConfigService()).dataSourceOptions,
);
