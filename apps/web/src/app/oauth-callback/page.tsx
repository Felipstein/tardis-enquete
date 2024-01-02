import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../components/common/Button';
import type { NextPage } from '@/types/NextPage';
import { authService } from '@/services/api/authService';
import APIError from '@/shared/APIError';

export default async function OAuthCallbackPage({ searchParams }: NextPage<{}, { code?: string }>) {
  const { code } = searchParams;

  if (!code) {
    return redirect('/login');
  }

  let errorMessage: string | null = null;
  let errorDebug: object | null = null;

  try {
    await authService.handleDiscordCallback({ code });
  } catch (error: unknown) {
    if (error instanceof APIError) {
      errorMessage = `${error.name}: ${error.message} - ${error.statusCode}`;
      errorDebug = error.debug ?? null;
    } else if (error instanceof Error) {
      errorMessage = `${error.name}: ${error.message}`;
      errorDebug = error;
    } else {
      errorMessage = 'Ocorreu um erro desconhecido, tente novamente.';
      errorDebug = typeof error === 'object' ? error : { error };
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2.5">
      {errorMessage && (
        <>
          <span className="text-sm text-red-500">{errorMessage}</span>

          {process.env.NODE_ENV === 'development' && errorDebug && (
            <pre className="my-2 w-full max-w-[90vw] overflow-x-auto rounded-md border border-red-500 bg-red-900/30 p-4 font-mono text-sm text-red-400 backdrop-blur-sm scrollbar-thin scrollbar-track-red-900/20 scrollbar-thumb-red-200/40 scrollbar-thumb-rounded-full">
              {JSON.stringify(errorDebug, null, 2)}
            </pre>
          )}

          <Button asChild size="sm">
            <Link href="/login">Página de Login</Link>
          </Button>
        </>
      )}
    </div>
  );
}
