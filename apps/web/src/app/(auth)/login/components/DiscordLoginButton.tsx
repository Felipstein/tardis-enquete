'use client';

import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/app/components/common/Button';
import { Discord } from '@/app/components/icons/Discord';
import { queryKeys } from '@/config/queryKeys';
import { authService } from '@/services/api/authService';

export function DiscordLoginButton() {
  const {
    data: redirectURL,
    isLoading: isLoadingRedirectURL,
    error: errorOnLoadRedirectURL,
    refetch: refetchRedirectURL,
  } = useQuery({
    queryKey: queryKeys.discordOAuthURL(),
    queryFn: authService.getDiscordOAuthURL,
  });

  const errorFeedback = useMemo(() => {
    if (errorOnLoadRedirectURL instanceof Error) {
      return errorOnLoadRedirectURL.message;
    }

    if (typeof errorOnLoadRedirectURL === 'string') {
      return errorOnLoadRedirectURL;
    }

    return 'Ocorreu um erro desconhecido ao tentar carregar a URL de redirecionamento.';
  }, [errorOnLoadRedirectURL]);

  if (errorOnLoadRedirectURL) {
    return (
      <div className="mt-2">
        <p className="text-red-400">{errorFeedback}</p>

        <Button
          icon={RefreshCw}
          variant="danger"
          className="mt-1 w-[90vw] sm:w-full"
          onClick={() => refetchRedirectURL()}
        >
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <Button icon={Discord} className="mt-2 w-[90vw] sm:w-full" asChild isLoading={isLoadingRedirectURL}>
      <a href={redirectURL} rel="noreferrer">
        Login com Discord
      </a>
    </Button>
  );
}
