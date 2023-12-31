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

import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { handleZodError } from './middlewares/handleZodErrorMiddleware';
import { omitPrismaErrors } from './middlewares/omitPrismaErrorsMiddleware';
import { routes } from './routes';

const app = express();
const server = createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: process.env.ORIGIN,
  },
});

io.on('connection', (socket) => {
  console.info(socket.id, 'user connected');

  socket.on('disconnect', () => {
    console.info(socket.id, 'user disconnected');
  });
});

app.use(express.json());
app.use(compression());
app.use(helmet());

app.use(
  cors({
    exposedHeaders: [apiErrorHeader],
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

app.use(omitPrismaErrors);
app.use(handleZodError);
app.use(errorHandler);

export { app, server, io };
