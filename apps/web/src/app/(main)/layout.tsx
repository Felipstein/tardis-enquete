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

      <Footer />
    </div>
  );
}
