import { Request } from 'express';

export function getHostURLInRequest(req: Request) {
  const hostname = req.headers.host ?? req.get('host') ?? `localhost:${process.env.PORT}`;

  console.log('HTTPS CHECK:', process.env.HTTTPS, req.protocol);

  const hostURL = `${process.env.HTTPS ? 'https' : req.protocol}://${hostname}`;

  console.log('URL RETORNED:', hostURL);

  return hostURL;
}
