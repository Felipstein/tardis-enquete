import 'express-async-errors';

import { createServer } from 'node:http';

import { apiErrorHeader } from '@tardis-enquete/contracts';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';

import TooManyRequests from '../domain/errors/TooManyRequests';
import { envParsed } from '../env';

import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { handleZodError } from './middlewares/handleZodErrorMiddleware';
import { omitPrismaErrors } from './middlewares/omitPrismaErrorsMiddleware';
import { routes } from './routes';
import { setupSockets } from './sockets';

const app = express();
const server = createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin(requestOrigin, callback) {
      if (!requestOrigin) {
        return callback(null, true);
      }

      const { ORIGINS } = envParsed();

      if (!ORIGINS.includes(requestOrigin)) {
        return callback(new Error('Origin not allowed'), false);
      }

      return callback(null, requestOrigin);
    },
  },
});

setupSockets(io);

app.use(express.json());
app.use(compression());
app.use(helmet());

app.use(
  cors({
    exposedHeaders: [apiErrorHeader],
    credentials: true,
    origin(requestOrigin, callback) {
      if (!requestOrigin) {
        return callback(null, true);
      }

      const { ORIGINS } = envParsed();

      if (!ORIGINS.includes(requestOrigin)) {
        return callback(new Error('Origin not allowed'), false);
      }

      return callback(null, requestOrigin);
    },
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

app.use(omitPrismaErrors);
app.use(handleZodError);
app.use(errorHandler);

export { app, server, io };
