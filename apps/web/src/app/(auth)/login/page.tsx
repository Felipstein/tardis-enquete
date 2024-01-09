import { RedirectType, redirect } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

import Link from 'next/link';
import { X } from 'lucide-react';
import { DiscordLoginButton } from './components/DiscordLoginButton';

import { Footer } from '@/app/components/Footer';
import { LogoImage } from '@/app/components/LogoImage';
import { getAccessTokenServerSide } from '@/utils/getAccessTokenServerSide';
import { NextPage } from '@/types/NextPage';
import { infoTokenService } from '@/services/infoTokenService';

export default function LoginPage({ searchParams }: NextPage<{}, { t?: string }>) {
  const { t: infoToken } = searchParams;

  const accessToken = getAccessTokenServerSide();

  if (accessToken) {
    return redirect('/');
  }

  let errorFeedback: string | null = null;

  if (infoToken) {
    const payload = infoTokenService.getInfoPayload(infoToken);

    if (!payload) {
      return redirect('/login', RedirectType.replace);
    }

    errorFeedback = payload.info;
  }

  return (
    <div className="flex h-full flex-col">
      <main className="flex flex-1 flex-col items-center justify-center gap-16">
        <header className="space-y-8">
          <main className="flex flex-col items-center gap-4">
            <LogoImage />

            <div className="-space-y-1">
              <h3 className="text-sm uppercase tracking-wide text-primary-300">Democracia da</h3>
              <h1 className="text-3xl font-bold uppercase tracking-widest text-primary-50">TARDIS</h1>
            </div>
          </main>

          <p className="text-center tracking-tight text-primary-100">
            <Balancer>Voz unida, força vivida – Juntos contra a tirania, a democracia guia.</Balancer>
          </p>
        </header>

        {errorFeedback && (
          <div className="relative my-3 space-y-2">
            <h3 className="truncate font-medium text-red-400">Ocorreu um problema na sua autenticação:</h3>
            <p className="max-w-96 truncate text-sm text-red-500">
              <Balancer>{errorFeedback}</Balancer>
            </p>

            <Link href="/login" replace className="absolute -right-2 -top-4 text-red-500">
              <X className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="text-center text-sm font-medium text-primary-50">
          <p className="block sm:hidden">Conecte-se pelo Discord.</p>
          <p className="hidden sm:block">Conecte-se com sua conta do Discord para continuar.</p>

          <DiscordLoginButton />
        </div>
      </main>

      <Footer />
    </div>
  );
}
