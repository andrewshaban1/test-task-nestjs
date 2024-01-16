import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test_task_server',
  password: 'asdx32FDG2bfR',
  database: 'test_task_server',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/**/*{.ts,.js}'],
  synchronize: false,
});

export default dataSource;
