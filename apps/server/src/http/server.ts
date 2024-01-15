import 'dotenv/config';
import '../env';

import { testDatabaseConnection } from '../infra/database/testDatabaseConnection';
import Logger from '../infra/logger';

import { server } from './app';

const log = Logger.start('SERVER');

const port = process.env.PORT;

async function main() {
  await testDatabaseConnection();

  server.listen(port, () => {
    log.info(`Server running on port ${port}.`);

    if (process.env.NODE_ENV === 'development') {
      log.info('Development Mode');
    }

    if (process.env.VERBOSE) {
      log.info('Verbose enabled');
    }
  });
}

main();
