import { cookieKeys } from '@tardis-enquete/contracts';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const redirectURL = new URL('/', req.url);

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `${cookieKeys.accessToken}=; Path=/; max-age=0`,
    },
  });
}
