'use client';

import { ReactNode } from 'react';

import { useDebugEnvironment } from '@/hooks/useDebugEnvironment';

export type DebugEnvironmentProps = {
  children: ReactNode;
};

export function DebugEnvironment({ children }: DebugEnvironmentProps) {
  const isDevEnvironment = useDebugEnvironment();

  if (!isDevEnvironment) {
    return null;
  }

  return children;
}
