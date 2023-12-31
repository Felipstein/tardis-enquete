'use client';

import { ReactNode } from 'react';

import { useUser } from '@/hooks/useUser';

export type DebugEnvironmentProps = {
  children: ReactNode;
};

export function DebugEnvironment({ children }: DebugEnvironmentProps) {
  const { status, user } = useUser();

  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  const isDevUser = status === 'authenticated' && user.role === 'developer';

  if (!isDevelopmentEnv && !isDevUser) {
    return null;
  }

  return children;
}
