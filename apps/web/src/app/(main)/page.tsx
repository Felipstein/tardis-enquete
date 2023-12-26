import { redirect } from 'next/navigation';

import { getAccessTokenServerSide } from '@/utils/getAccessTokenServerSide';

export default function HomePage() {
  const accessToken = getAccessTokenServerSide();

  if (!accessToken) {
    return redirect('/login');
  }

  return (
    <div className="flex h-full items-center justify-center">
      <h1>Home Page</h1>
    </div>
  );
}
