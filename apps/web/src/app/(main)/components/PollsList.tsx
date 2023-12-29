'use client';

import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { useMemo } from 'react';

import { PollCard } from './PollCard';

import { Button } from '@/app/components/common/Button';
import { LoaderIcon } from '@/app/components/common/LoaderIcon';
import { queryKeys } from '@/config/queryKeys';
import { pollService } from '@/services/api/pollService';

export function PollsList() {
  const {
    data: polls = [],
    isLoading: isLoadingPolls,
    error: errorOnLoadPolls,
    refetch: refetchPolls,
  } = useQuery({
    queryKey: queryKeys.polls(),
    queryFn: pollService.getPolls,
  });

  const errorMessage = useMemo(() => {
    if (!errorOnLoadPolls) {
      return null;
    }

    if (errorOnLoadPolls instanceof Error) {
      return errorOnLoadPolls.message;
    }

    if (typeof errorOnLoadPolls === 'string') {
      return errorOnLoadPolls;
    }

    return 'Ocorreu um erro desconhecido ao tentar carregar as enquetes.';
  }, [errorOnLoadPolls]);

  if (isLoadingPolls) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3.5">
        <LoaderIcon className="h-6 w-6" />
      </div>
    );
  }

  if (errorOnLoadPolls) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3.5">
        <h3 className="text-sm text-red-400">{errorMessage}</h3>

        <Button icon={RefreshCw} onClick={() => refetchPolls()} variant="danger">
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <ul className="mx-4 flex w-full flex-col gap-12 sm:mx-auto sm:w-[471px]">
      {polls.map((poll, index) => {
        const isLast = index === polls.length - 1;

        return (
          <>
            <li key={poll.id} className="w-full">
              <PollCard poll={poll} />
            </li>

            {!isLast && (
              <li key={poll.id} className="w-full">
                <div className="h-px rounded-full bg-primary-700/50" />
              </li>
            )}
          </>
        );
      })}
    </ul>
  );
}
