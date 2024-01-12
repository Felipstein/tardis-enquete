import { redirect } from 'next/navigation';

import { PollTimeline } from '@tardis-enquete/contracts';
import { PollsList } from './components/PollsList';

import { getAccessTokenServerSide } from '@/utils/getAccessTokenServerSide';
import { queryClient } from '@/libs/queryClient';
import { queryKeys } from '@/config/queryKeys';
import { pollService } from '@/services/api/pollService';

export default async function HomePage() {
  const accessToken = getAccessTokenServerSide();

  if (!accessToken) {
    return redirect('/login');
  }

  let polls: PollTimeline[] | undefined;
  let errorOnFetchPolls: unknown | null | undefined;

  try {
    polls = await queryClient.fetchQuery({
      queryKey: queryKeys.polls(),
      queryFn: () => pollService.getPolls(),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorOnFetchPolls = { ...error };
    } else {
      errorOnFetchPolls = error;
    }
  }

  return (
    <div className="mt-6 flex h-full items-center justify-center sm:mt-8">
      <PollsList pollsAlreadyFetched={polls} errorOnInitialFetch={errorOnFetchPolls} />
    </div>
  );
}
