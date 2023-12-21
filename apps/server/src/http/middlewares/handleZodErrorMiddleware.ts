import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import UnprocessableEntity from '../../domain/errors/UnprocessableEntity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handleZodError(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ZodError) {
    if (!error.issues.length) {
      console.error(
        chalk.red('Wrong request payload detected, but the zod error not provided correct informations. ZodError:'),
      );
      console.error(error);

      throw new UnprocessableEntity('Não foi possível atender a requisição, alguns dados estão incorretos.');
    }

    const firstIssueError = error.issues[0];

    let message: string;

    if (process.env.NODE_ENV !== 'production' || req.user?.role === 'developer') {
      message = `${firstIssueError.path.join('.')}: ${firstIssueError.message}`;
    } else {
      message = firstIssueError.message;
    }

    throw new UnprocessableEntity(message);
  }

  throw error;
}
