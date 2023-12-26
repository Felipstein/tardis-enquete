import { cookieKeys } from '@tardis-enquete/contracts';
import { NextResponse, NextRequest } from 'next/server';

import { authService } from '@/services/api/authService';

export async function GET(req: NextRequest) {
  const tokenCookie = req.cookies.get(cookieKeys.accessToken);

  const token = tokenCookie?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const user = await authService.verifyToken({ t: token });

  return NextResponse.json({ user });
}
