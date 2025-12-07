import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { connect, NatsConnection, StringCodec } from 'nats';

@Injectable()
export class NatsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NatsService.name);
  private nc: NatsConnection;
  private sc = StringCodec();

  async onModuleInit() {
    const url = process.env.NATS_URL;
    this.nc = await connect({ servers: url });
    this.logger.log('Connected to NATS');
  }

  publish(subject: string, payload: unknown) {
    const data = this.sc.encode(JSON.stringify(payload));
    return this.nc.publish(subject, data);
  }

  async onModuleDestroy() {
    await this.nc.close();
    this.logger.log('NATS connection closed');
  }
}
