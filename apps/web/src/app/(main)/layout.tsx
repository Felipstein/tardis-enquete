import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { Footer } from '../components/Footer';

import { Header } from './components/Header';

import { getAccessTokenServerSide } from '@/utils/getAccessTokenServerSide';

export default function MainLayout({ children }: { children: ReactNode }) {
  const accessToken = getAccessTokenServerSide();

  if (!accessToken) {
    return redirect('/login');
  }

  return (
    <div className="h-full">
      <div className="h-fit min-h-[80vh]">
        <Header />

        <main className="h-fit">{children}</main>
      </div>

      <span className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md border border-red-500 bg-red-800/30 px-3.5 py-2 text-xs font-semibold text-red-500">
        As votações estão bloqueadas
      </span>

      <Footer />
    </div>
  );
}
