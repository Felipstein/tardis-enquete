import { NextFunction, Request, Response } from 'express';

import InternalServerError from '../../domain/errors/InternalServerError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function omitPrismaErrors(error: Error, req: Request, res: Response, next: NextFunction) {
  const errorName = error.name;

  const isPrismaError = errorName.includes('Prisma') && errorName.includes('Error');

  const showPrismaError = process.env.NODE_ENV !== 'production' || req.user?.role === 'developer';

  if (isPrismaError && !showPrismaError) {
    throw new InternalServerError('Ocorreu um erro interno nas consultas dos dados, tente novamente mais tarde', 500);
  }

  throw error;
}
