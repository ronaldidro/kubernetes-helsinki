import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbLogger } from './config/db.logger';
import { typeOrmConfig } from './config/typeorm.config';
import { HealthController } from './health/health.controller';
import { TodosModule } from './todos/todos.module';
import { NatsService } from './nats/nats.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TodosModule],
  providers: [DbLogger, NatsService],
  controllers: [HealthController],
})
export class AppModule {}
