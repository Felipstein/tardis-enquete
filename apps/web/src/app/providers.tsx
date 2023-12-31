/* eslint-disable next-recommended/unnecessarily-client-declaration */

'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import type { ReactNode } from 'react';

import { SocketProvider } from '@/contexts/SocketContext';
import { queryClient } from '@/libs/queryClient';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>{children}</SocketProvider>
    </QueryClientProvider>
  );
}
