import { cookieKeys } from '@tardis-enquete/contracts';
import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/services/api/authService';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      const redirectURL = new URL('/login', req.url);

      console.warn('[OAuth Callback Router] No code provided, redirecting to login page.');

      return NextResponse.redirect(redirectURL);
    }

    const accessToken = await authService.handleDiscordCallback({ code });

    const redirectURL = new URL('/', req.url);

    console.info('[OAuth Callback Router] Access Token exchanged:', accessToken);

    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `${cookieKeys.accessToken}=${accessToken}; Path=/;`,
      },
    });
  } catch (error: unknown) {
    console.error('[OAuth Callback Router] An error occurred during OAuth callback:', error);

    return NextResponse.redirect(new URL('/login', req.url));
  }
}
