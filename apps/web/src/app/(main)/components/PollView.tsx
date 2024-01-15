'use client';

import { PollCard, PollCardProps } from './PollCard';
import { usePollVotesChanges } from '@/hooks/usePollVotesChanges';

export function PollView(props: PollCardProps) {
  usePollVotesChanges();

  return <PollCard {...props} />;
}
