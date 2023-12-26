import { APIErrorResponse, apiErrorHeader } from '@tardis-enquete/contracts';
import { AxiosError } from 'axios';
import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';

import APIError from '../../domain/errors/APIError';
import InternalServerError from '../../domain/errors/InternalServerError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  const line = '#'.repeat(8);

  const { name } = error;
  const { message } = error;

  let statusCode: APIErrorResponse['statusCode'];

  const debug: APIErrorResponse['debug'] = {
    stack: error.stack || new Error().stack!,
  };

  if (error instanceof APIError) {
    statusCode = error.statusCode;

    if (error instanceof InternalServerError) {
      if (error.originalError) {
        debug.internalServerError = {
          name: error.originalError.name,
          message: error.originalError.message,
          stack: error.originalError.stack,
        };
      }

      console.error('');
      console.error(chalk.red(line, 'INTERNAL SERVER ERROR', line));
      console.error(error.originalError ?? error);
      console.error('');
      console.error(chalk.red('Caused on route'), req.path);
      console.error(chalk.red(line, 'INTERNAL SERVER ERROR', line));
      console.error('');
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('');
      console.warn(chalk.yellow(line, 'API ERROR', line));
      console.warn(error);
      console.warn('');
      console.warn(chalk.yellow('Caused on route'), req.path);
      console.warn(chalk.yellow(line, 'API ERROR', line));
      console.warn('');
    }
  } else {
    statusCode = 500;

    const errorPrinter = error instanceof AxiosError ? error.response?.data ?? error.response ?? error : error;

    console.error('');
    console.error(chalk.red(line, 'UNKNOWN INTERNAL ERROR', line));
    console.error(errorPrinter);
    console.error('');
    console.error(chalk.red('Caused on route'), req.path);
    console.error(chalk.red(line, 'UNKNOWN INTERNAL ERROR', line));
    console.error('');
  }

  const showDebug = process.env.NODE_ENV !== 'production' || req.user?.role === 'developer';

  res.setHeader(apiErrorHeader, 'true');

  return res.status(statusCode).json({
    name,
    message,
    statusCode,
    debug: showDebug ? debug : undefined,
  } satisfies APIErrorResponse);
}
