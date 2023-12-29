'use server';

import { cookieKeys } from '@tardis-enquete/contracts';
import { cookies } from 'next/headers';

export async function fetchToken() {
  const accessTokenCookie = cookies().get(cookieKeys.accessToken);

  const accessToken = accessTokenCookie?.value;

  if (!accessToken) {
    return null;
  }

  return accessToken;
}
