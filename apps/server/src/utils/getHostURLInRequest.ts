import { Request } from 'express';

export function getHostURLInRequest(req: Request) {
  const hostname = req.headers.host ?? req.get('host') ?? `localhost:${process.env.PORT}`;

  const hostURL = `${req.protocol}://${hostname}`;

  return hostURL;
}
