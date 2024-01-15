import { redirect } from 'next/navigation';
import EditPollForm from './components/EditPollForm';
import { queryKeys } from '@/config/queryKeys';
import { queryClient } from '@/libs/queryClient';
import { pollService } from '@/services/api/pollService';
import { NextPage } from '@/types/NextPage';

export default async function EditPollPage({ params }: NextPage<{ pollId: string }>) {
  const { pollId } = params;

  try {
    const poll = await queryClient.fetchQuery({
      queryKey: queryKeys.poll(pollId),
      queryFn: () => pollService.getPoll({ pollId }),
    });

    return (
      <main className="mx-2 mt-16 w-full min-w-0 sm:mx-auto sm:max-w-2xl">
        <EditPollForm pollId={pollId} defaultPollFetched={poll} />
      </main>
    );
  } catch (error: unknown) {
    console.error(error);

    return redirect('/');
  }
}
