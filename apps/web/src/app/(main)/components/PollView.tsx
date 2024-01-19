'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PollCard, PollCardProps } from './PollCard';
import { BackButton } from '@/app/components/BackButton';
import { usePollDelete } from '@/hooks/usePollDelete';
import { usePollVotesChanges } from '@/hooks/usePollVotesChanges';
import { usePollCreated } from '@/hooks/usePollCreated';

export function PollView(props: PollCardProps) {
  const router = useRouter();

  usePollVotesChanges();

  usePollCreated();

  usePollDelete((pollId) => {
    if (pollId === props.poll.id) {
      toast.error('Essa enquete foi excluída');

      router.push('/');
    }
  });

  return (
    <div className="relative">
      <BackButton title="Voltar para Página Inicial" href="/" />

      <PollCard {...props} />
    </div>
  );
}
