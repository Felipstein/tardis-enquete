import { Request } from 'express';

import { envParsed } from '../env';

export function getClientURLInRequest(req: Request) {
  const { ORIGINS } = envParsed();

  const origin = ORIGINS[0];

  const baseURL = req.headers.origin || req.headers.origin?.substring(0, req.headers.origin.length - 1) || origin;

  return baseURL;
}
