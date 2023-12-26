import Balancer from 'react-wrap-balancer';

import { DiscordLoginButton } from './components/DiscordLoginButton';

import { Footer } from '@/app/components/Footer';
import { LogoImage } from '@/app/components/LogoImage';

export default function LoginPage() {
  return (
    <div className="flex h-full flex-col">
      <main className="flex flex-1 flex-col items-center justify-center gap-16">
        <header className="space-y-8">
          <main className="flex flex-col items-center gap-4">
            <LogoImage />

            <div className="-space-y-1">
              <h3 className="text-primary-300 text-sm uppercase tracking-wide">Democracia da</h3>
              <h1 className="text-primary-50 text-3xl font-bold uppercase tracking-widest">TARDIS</h1>
            </div>
          </main>

          <p className="text-primary-100 text-center tracking-tight">
            <Balancer>Voz unida, força vivida – Juntos contra a tirania, a democracia guia.</Balancer>
          </p>
        </header>

        <div className="text-primary-50 text-center text-sm font-medium">
          <p className="block sm:hidden">Conecte-se pelo Discord.</p>
          <p className="hidden sm:block">Conecte-se com sua conta do Discord para continuar.</p>

          <DiscordLoginButton className="mt-2 w-[90vw] sm:w-full" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
