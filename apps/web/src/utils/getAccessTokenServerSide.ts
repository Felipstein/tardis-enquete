import { cookieKeys } from '@tardis-enquete/contracts';
import { cookies } from 'next/headers';

export function getAccessTokenServerSide() {
  const cookiesStore = cookies();

  const accessTokenCookie = cookiesStore.get(cookieKeys.accessToken);

  if (!accessTokenCookie || !accessTokenCookie.value) {
    return null;
  }

  return accessTokenCookie.value;
}
