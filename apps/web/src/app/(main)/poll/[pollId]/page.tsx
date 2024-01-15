import { redirect } from 'next/navigation';
import { PollCard } from '../../components/PollCard';
import { queryKeys } from '@/config/queryKeys';
import { queryClient } from '@/libs/queryClient';
import { pollService } from '@/services/api/pollService';
import { NextPage } from '@/types/NextPage';

export default async function PollPage({ params }: NextPage<{ pollId: string }>) {
  const { pollId } = params;

  try {
    const polls = await queryClient.fetchQuery({
      queryKey: queryKeys.polls(),
      queryFn: () => pollService.getPolls(),
    });

    const poll = polls.find((poll) => poll.id === pollId);

    if (!poll) {
      throw new Error('Enquete não encontrada');
    }

    return (
      <main className="mx-2 mt-16 w-full min-w-0 sm:mx-auto sm:max-w-2xl">
        <PollCard poll={poll} />
      </main>
    );
  } catch (error: unknown) {
    console.error(error);

    return redirect('/');
  }
}
