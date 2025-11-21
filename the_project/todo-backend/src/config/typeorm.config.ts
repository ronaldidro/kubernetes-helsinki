import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from '../todos/entities/todo.entity';
import { dbConfig } from './db.config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [Todo],
  synchronize: true,
};
