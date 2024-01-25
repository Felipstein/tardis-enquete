import { redirect } from 'next/navigation';

import { PollsList } from './components/PollsList';

import { getAccessTokenServerSide } from '@/utils/getAccessTokenServerSide';

export default async function HomePage() {
  const accessToken = getAccessTokenServerSide();

  if (!accessToken) {
    return redirect('/login');
  }

  return (
    <div className="mt-6 flex h-full items-center justify-center sm:mt-8">
      <PollsList />
    </div>
  );
}
