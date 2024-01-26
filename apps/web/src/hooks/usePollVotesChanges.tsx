'use client';

import { PollTimeline } from '@tardis-enquete/contracts';
import { useSocketEvent } from './useSocketEvent';
import { queryClient } from '@/libs/queryClient';
import { queryKeys } from '@/config/queryKeys';

export function usePollVotesChanges(onVotesChanges?: (pollUpdated: PollTimeline) => void) {
  useSocketEvent('pollVotesChanges', ({ poll: pollUpdated }) => {
    console.info('A poll has updated, poll:', pollUpdated);

    pollUpdated = {
      ...pollUpdated,
      createdAt: new Date(pollUpdated.createdAt),
      expireAt: pollUpdated.expireAt && new Date(pollUpdated.expireAt),
    };

    const polls = queryClient.getQueryData<PollTimeline[]>(queryKeys.polls()) || [];

    queryClient.setQueryData<PollTimeline[]>(
      queryKeys.polls(),
      polls.map((poll) => (poll.id === pollUpdated.id ? pollUpdated : poll)),
    );

    onVotesChanges?.(pollUpdated);
  });
}
