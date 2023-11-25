import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './data.service';
import { ConfigService } from '@nestjs/config';

export const dataSource: DataSource = new DataSource(
  new TypeOrmConfigService(new ConfigService()).dataSourceOptions,
);
