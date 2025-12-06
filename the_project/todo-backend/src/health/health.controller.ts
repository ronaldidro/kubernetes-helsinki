import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('healthz')
export class HealthController {
  private readonly logger = new Logger('Health');

  constructor(private dataSource: DataSource) {}

  @Get()
  async healthz() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }
      await this.dataSource.query('SELECT 1');
      return { status: 'ok' };
    } catch (error) {
      this.logger.error('DB health check failed', error);
      throw new ServiceUnavailableException('db unavailable');
    }
  }
}
