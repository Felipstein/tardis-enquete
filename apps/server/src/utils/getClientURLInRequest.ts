import { Request } from 'express';

export function getClientURLInRequest(req: Request) {
  const baseURL =
    req.headers.origin || req.headers.origin?.substring(0, req.headers.origin.length - 1) || process.env.ORIGIN;

  return baseURL;
}
