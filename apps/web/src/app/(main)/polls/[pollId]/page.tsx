import { redirect } from 'next/navigation';
import EditPollForm from './components/EditPollForm';
import { queryKeys } from '@/config/queryKeys';
import { queryClient } from '@/libs/queryClient';
import { pollService } from '@/services/api/pollService';
import { NextPage } from '@/types/NextPage';

export default async function PollPage({ params }: NextPage<{ pollId: string }>) {
  const { pollId } = params;

  try {
    const poll = await queryClient.fetchQuery({
      queryKey: queryKeys.poll(pollId),
      queryFn: () => pollService.getPoll({ pollId }),
    });

    return <EditPollForm poll={poll} />;
  } catch (error: unknown) {
    console.error(error);

    return redirect('/');
  }
}
