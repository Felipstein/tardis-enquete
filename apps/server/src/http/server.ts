import 'dotenv/config';
import '../env';

import { server } from './app';

const port = process.env.PORT;

server.listen(port, () => {
  console.info(`Server running on port ${port}.`);
});
