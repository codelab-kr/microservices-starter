import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 23306,
  username: 'test',
  password: 'test',
  database: 'test',
  logging: true,
  // entities: [UserEntity],
  migrations: ['./*.ts'],
  metadataTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
