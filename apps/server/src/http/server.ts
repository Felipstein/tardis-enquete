import 'dotenv/config';
import '../env';

import { app } from './app';

const port = process.env.PORT;

app.listen(port, () => {
  console.info(`Server running on port ${port}.`);
});
