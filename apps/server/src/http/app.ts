import 'express-async-errors';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import TooManyRequests from '../domain/errors/TooManyRequests';

import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());

app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    handler() {
      throw new TooManyRequests();
    },
  }),
);

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

app.use(routes);

app.use(errorHandler);

export { app };
