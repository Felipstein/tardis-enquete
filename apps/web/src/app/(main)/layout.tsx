import { ReactNode } from 'react';

import { Footer } from '../components/Footer';
import { LogoImage } from '../components/LogoImage';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <div className="h-fit min-h-[80vh]">
        <header className="flex items-center justify-between sm:px-10 sm:py-6">
          <div className="flex items-center gap-2.5">
            <LogoImage width={42} height={42} />

            <h1 className="text-primary-50 text-xl font-bold uppercase tracking-wide">TARDIS</h1>
          </div>

          <div>
            <p>User Info</p>
          </div>
        </header>

        <main className="h-fit">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
