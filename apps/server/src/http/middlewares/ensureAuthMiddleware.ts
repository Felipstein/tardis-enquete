import { NextFunction, Request, Response } from 'express';

import { UserRole, userRoles } from '../../domain/entities/StoredUser';
import Forbidden from '../../domain/errors/Forbidden';
import Unauthorized from '../../domain/errors/Unauthorized';
import { factoryTokenService } from '../../infra/factories/services';

const tokenService = factoryTokenService();

export function ensureAuth(...authorizedRoles: UserRole[]) {
  // eslint-disable-next-line no-param-reassign
  authorizedRoles = authorizedRoles.length === 0 ? (userRoles as unknown as UserRole[]) : authorizedRoles;

  return async (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      throw new Unauthorized();
    }

    const [tokenType, token] = tokenHeader.split(' ');

    if (tokenType !== 'Bearer') {
      throw new Unauthorized();
    }

    if (!token) {
      throw new Unauthorized();
    }

    const { status, payload } = await tokenService.verify('access', token);

    if (status === 'expired') {
      throw new Unauthorized('Não autenticado: sua sessão expirou.');
    }

    if (status === 'invalid' || status !== 'valid') {
      throw new Unauthorized('Não autenticado: informações inválidas.');
    }

    if (payload.development && process.env.NODE_ENV !== 'development') {
      throw new Unauthorized();
    }

    console.log({ authorizedRoles, role: payload.role, includes: authorizedRoles.includes(payload.role) });

    if (!authorizedRoles.includes(payload.role)) {
      throw new Forbidden();
    }

    req.accessToken = token;
    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    return next();
  };
}
