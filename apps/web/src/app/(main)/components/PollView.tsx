'use client';

import { PollCard, PollCardProps } from './PollCard';
import { BackButton } from '@/app/components/BackButton';
import { usePollVotesChanges } from '@/hooks/usePollVotesChanges';

export function PollView(props: PollCardProps) {
  usePollVotesChanges();

  return (
    <div className="relative">
      <BackButton title="Voltar para Página Inicial" href="/" />

      <PollCard {...props} />
    </div>
  );
}
