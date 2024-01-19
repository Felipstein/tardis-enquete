'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { PollCard, PollCardProps } from './PollCard';
import { BackButton } from '@/app/components/BackButton';
import { usePollDelete } from '@/hooks/usePollDelete';
import { usePollVotesChanges } from '@/hooks/usePollVotesChanges';
import { usePollCreated } from '@/hooks/usePollCreated';

export function PollView({ poll: initialPoll, ...props }: PollCardProps) {
  const router = useRouter();

  const [poll, setPoll] = useState(initialPoll);

  usePollVotesChanges((pollUpdated) => {
    if (poll.id === pollUpdated.id) {
      setPoll(pollUpdated);
    }
  });

  usePollCreated();

  usePollDelete((pollId) => {
    if (pollId === poll.id) {
      toast.error('Essa enquete foi excluída');

      router.push('/');
    }
  });

  return (
    <div className="relative">
      <BackButton title="Voltar para Página Inicial" href="/" />

      <PollCard poll={poll} {...props} />
    </div>
  );
}
