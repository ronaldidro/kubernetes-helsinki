import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDatabaseIfNotExists } from './config/db.config';

async function bootstrap() {
  await createDatabaseIfNotExists();

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const port = process.env.BACKEND_PORT!;

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((e) =>
          Object.values(e.constraints || {}),
        );
        logger.warn(`Validation error: ${JSON.stringify(messages)}`);
        return new BadRequestException(messages);
      },
    }),
  );

  await app.listen(port);

  logger.log(`Service running on port ${port}`);
}
bootstrap();
