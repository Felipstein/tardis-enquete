import './globals.css';

import { Inter } from 'next/font/google';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TARDIS | Enquete',
  description: 'Enquetes da TARDIS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`scrollbar-thin scrollbar-track-primary-800 scrollbar-thumb-primary-500/60 scrollbar-thumb-rounded-full bg-gradient-to-br from-[#1E293B] to-[#0F172A] bg-fixed text-white ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
