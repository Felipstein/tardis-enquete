import './globals.css';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Inter } from 'next/font/google';

import { DebugEnvironment } from './components/DebugEnvironment';
import { Providers } from './providers';

import { AllSocketsInfo } from './components/_debug/AllSocketsInfo';
import { SocketInfo } from './components/_debug/SocketInfo';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { queryClient } from '@/libs/queryClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TARDIS | Enquete',
  description: 'Enquetes da TARDIS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`bg-app-background bg-fixed text-white scrollbar-thin scrollbar-track-primary-800 scrollbar-thumb-primary-500/60 scrollbar-thumb-rounded-full ${inter.className}`}
      >
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            {/* <TrackMousePosition> */}
            {children}

            {/* <RenderMousePositions /> */}

            <DebugEnvironment>
              <ReactQueryDevtools />

              <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-4">
                <AllSocketsInfo />

                <SocketInfo />
              </div>
            </DebugEnvironment>
            {/* </TrackMousePosition> */}
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
