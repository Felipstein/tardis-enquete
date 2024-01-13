'use client';

import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { useMemo } from 'react';

import { PollTimeline } from '@tardis-enquete/contracts';
import { PollCard } from './PollCard';

import { Button } from '@/app/components/common/Button';
import { LoaderIcon } from '@/app/components/common/LoaderIcon';
import { queryKeys } from '@/config/queryKeys';
import { pollService } from '@/services/api/pollService';
import { usePollsSearchStore } from '@/stores/PollsSearchStore';
import { useSocketEvent } from '@/hooks/useSocketEvent';
import { queryClient } from '@/libs/queryClient';
import { w } from '@/utils/w';
import { usePollsListGridTemplate } from '@/stores/PollsListGridTemplate';

export type PollsListProps = {
  pollsAlreadyFetched?: PollTimeline[];
  errorOnInitialFetch?: unknown | null;
};

export function PollsList({ pollsAlreadyFetched, errorOnInitialFetch }: PollsListProps) {
  const gridTemplate = usePollsListGridTemplate((s) => s.gridTemplate);

  const {
    data: polls = [],
    isLoading: isLoadingPolls,
    error: errorOnLoadPolls,
    refetch: refetchPolls,
  } = useQuery({
    queryKey: queryKeys.polls(),
    queryFn: pollService.getPolls,
    initialData: pollsAlreadyFetched,
  });

  const searchInput = usePollsSearchStore((s) => s.searchInput);

  useSocketEvent('pollVotesChanges', ({ poll: pollUpdated }) => {
    console.info('A poll has updated, poll:', pollUpdated);

    const polls = queryClient.getQueryData<PollTimeline[]>(queryKeys.polls()) || [];

    queryClient.setQueryData<PollTimeline[]>(
      queryKeys.polls(),
      polls.map((poll) => (poll.id === pollUpdated.id ? pollUpdated : poll)),
    );
  });

  const pollsFiltered = useMemo(() => {
    if (!searchInput) {
      return polls;
    }

    return polls.filter((poll) => {
      const { title, description, author, options } = poll;

      const optionTexts = options.map((option) => option.text);

      return [title, description, author.username, ...optionTexts].some((text) =>
        text.toLowerCase().includes(searchInput.toLowerCase()),
      );
    });
  }, [polls, searchInput]);

  const errorMessage = useMemo(() => {
    const error = errorOnLoadPolls || errorOnInitialFetch;

    if (!error) {
      return null;
    }

    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    return 'Ocorreu um erro desconhecido ao tentar carregar as enquetes.';
  }, [errorOnLoadPolls, errorOnInitialFetch]);

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
        <p className="text-sm text-red-400">{errorMessage}</p>

        <Button icon={RefreshCw} onClick={() => refetchPolls()} variant="danger">
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (polls.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3.5">
        <p className="text-sm text-primary-500">Não há enquetes no momento</p>
      </div>
    );
  }

  if (pollsFiltered.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3.5">
        {searchInput.length > 200 ? (
          <p className="max-w-[80vw] truncate whitespace-break-spaces text-sm text-primary-500">TÁ DE SACANAGEM?</p>
        ) : (
          <p className="max-w-[80vw] truncate whitespace-break-spaces text-sm text-primary-500">
            Nenhuma enquete encontrada com o termo <strong>&quot;{searchInput}&quot;</strong>
          </p>
        )}
      </div>
    );
  }

  return (
    <ul
      className={w(
        gridTemplate === 'row' && 'mx-4 flex w-full flex-col gap-12 sm:mx-auto sm:w-[471px]',
        gridTemplate === 'grid' &&
          'mx-4 flex w-full flex-wrap items-center justify-center gap-16 sm:mx-auto sm:w-[95vw]',
      )}
    >
      {pollsFiltered.map((poll, index) => {
        const isLast = index === pollsFiltered.length - 1;

        return (
          <li
            key={poll.id}
            data-last={isLast}
            className={w(
              gridTemplate === 'row' &&
                'w-full data-[last=false]:border-b data-[last=false]:border-primary-700/70 data-[last=false]:pb-12',
              gridTemplate === 'grid' &&
                'w-full rounded-md bg-gradient-to-br from-primary-900/40 to-primary-800/60 p-12 sm:w-[520px]',
            )}
          >
            <PollCard poll={poll} />
          </li>
        );
      })}
    </ul>
  );
}
