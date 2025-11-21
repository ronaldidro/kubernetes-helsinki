import { Logger } from '@nestjs/common';
import { Client } from 'pg';

export const dbConfig = {
  host: process.env.PG_HOST,
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: 'todos',
  defaultDatabase: 'postgres',
};

const logger = new Logger('Database');

export async function createDatabaseIfNotExists() {
  const client = new Client({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.defaultDatabase,
  });

  try {
    await client.connect();
    const dbName = dbConfig.database;

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName],
    );

    if (res.rowCount === 0) {
      logger.log(`Creating database "${dbName}"...`);
      await client.query(`CREATE DATABASE ${dbName}`);
      logger.log(`Database "${dbName}" created successfully.`);
    } else {
      logger.log(`Database "${dbName}" already exists.`);
    }
  } catch (err) {
    logger.error('Error creating the database', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}
