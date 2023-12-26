import { redirect } from 'next/navigation';

import { getAccessTokenServerSide } from '@/utils/getAccessTokenServerSide';

export default function HomePage() {
  const accessToken = getAccessTokenServerSide();

  if (!accessToken) {
    return redirect('/login');
  }

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
