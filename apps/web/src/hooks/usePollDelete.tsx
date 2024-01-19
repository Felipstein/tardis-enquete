'use client';

import { PollTimeline } from '@tardis-enquete/contracts';
import { useSocketEvent } from './useSocketEvent';
import { queryClient } from '@/libs/queryClient';
import { queryKeys } from '@/config/queryKeys';

export function usePollDelete(onDelete?: (pollId: string) => void) {
  useSocketEvent('pollDelete', ({ pollId: pollDeletedId }) => {
    console.info('A poll has deleted, pollId:', pollDeletedId);

    const polls = queryClient.getQueryData<PollTimeline[]>(queryKeys.polls()) || [];

    queryClient.setQueryData<PollTimeline[]>(
      queryKeys.polls(),
      polls.filter((poll) => poll.id !== pollDeletedId),
    );

    onDelete?.(pollDeletedId);
  });
}
