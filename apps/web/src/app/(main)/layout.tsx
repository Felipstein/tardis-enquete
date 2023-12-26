import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { Footer } from '../components/Footer';
import { LogoImage } from '../components/LogoImage';

import { UserInfo } from './components/UserInfo';

import { getAccessTokenServerSide } from '@/utils/getAccessTokenServerSide';

export default function MainLayout({ children }: { children: ReactNode }) {
  const accessToken = getAccessTokenServerSide();

  if (!accessToken) {
    return redirect('/login');
  }

  return (
    <div className="h-full">
      <div className="h-fit min-h-[80vh]">
        <header className="flex items-center justify-between p-4 sm:px-10 sm:py-6">
          <div className="flex items-center gap-2.5">
            <LogoImage width={42} height={42} />

            <h1 className="text-xl font-bold uppercase tracking-wide text-primary-50">TARDIS</h1>
          </div>

          <UserInfo />
        </header>

        <main className="h-fit">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
