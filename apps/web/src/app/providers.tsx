/* eslint-disable next-recommended/unnecessarily-client-declaration */

'use client';

import 'react-toastify/dist/ReactToastify.css';

import { QueryClientProvider } from '@tanstack/react-query';

import { ToastContainer } from 'react-toastify';
import type { ReactNode } from 'react';

import { SocketProvider } from '@/contexts/SocketContext';
import { queryClient } from '@/libs/queryClient';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        {children}

        <ToastContainer position="bottom-right" hideProgressBar pauseOnFocusLoss={false} pauseOnHover={false} />
      </SocketProvider>
    </QueryClientProvider>
  );
}
