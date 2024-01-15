import Logger from '../logger';

import { prisma } from './prisma';

const log = Logger.start('DATABASE');

export async function testDatabaseConnection() {
  try {
    log.info('Testing database connection');

    await prisma.$connect();

    log.success('Database connected');
  } catch (error: unknown) {
    log.error(error);

    process.exit(1);
  }
}
