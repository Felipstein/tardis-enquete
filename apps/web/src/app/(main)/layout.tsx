import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { Footer } from '../components/Footer';

import { DebugEnvironment } from '../components/DebugEnvironment';
import { Toaster } from '../components/common/sonner';
import { Header } from './components/Header';

import { FeedbackSection } from './components/FeedbackSection';
import { DebugSection } from './components/DebugSection';
import { NotificationListener } from './components/NotificationListener';
import { getAccessTokenServerSide } from '@/utils/getAccessTokenServerSide';

export default function MainLayout({ children }: { children: ReactNode }) {
  const accessToken = getAccessTokenServerSide();

  if (!accessToken) {
    return redirect('/login');
  }

  return (
    <>
      <div className="h-full">
        <div className="h-fit min-h-[80vh]">
          <Header />

          <NotificationListener>
            <main className="h-fit">{children}</main>

            <Toaster />
          </NotificationListener>
        </div>

        <Footer />
      </div>

      <FeedbackSection />

      <DebugEnvironment>
        <DebugSection />
      </DebugEnvironment>
    </>
  );
}
