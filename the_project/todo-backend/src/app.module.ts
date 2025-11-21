import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbLogger } from './config/db.logger';
import { typeOrmConfig } from './config/typeorm.config';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TodosModule],
  providers: [DbLogger],
})
export class AppModule {}
