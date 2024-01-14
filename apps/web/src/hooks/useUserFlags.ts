'use client';

import { useUser } from './useUser';

export function useDebugEnvironment() {
  const { status, user } = useUser();

  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  const isDevUser = status === 'authenticated' && user.role === 'developer';

  return isDevelopmentEnv || isDevUser;
}
