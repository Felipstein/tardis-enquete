import Link from 'next/link';
import { UserInfo } from '../UserInfo';

import { PollsSearchInput } from './PollsSearchInput';
import { NewPollButton } from './NewPollButton';
import { HeaderSettings } from './HeaderSettings';
import { LogoImage } from '@/app/components/LogoImage';
import { AdminSection } from '@/app/components/AdminSection';

export function HeaderContent() {
  return (
    <main className="mx-auto flex h-full w-full max-w-[1980px] items-center justify-between p-4 sm:px-10 sm:py-6">
      <Link href="/" className="flex items-center gap-2.5">
        <LogoImage width={42} height={42} />

        <h1 className="text-xl font-bold uppercase tracking-wide text-primary-50">TARDIS</h1>
      </Link>

      <div className="hidden w-full max-w-[400px] sm:absolute sm:left-1/2 sm:block sm:-translate-x-1/2">
        <PollsSearchInput />
      </div>

      <div className="flex h-full items-center gap-4">
        <AdminSection>
          <NewPollButton />
        </AdminSection>

        <div className="h-6 w-px bg-primary-700" />

        <HeaderSettings />

        <div className="h-6 w-px bg-primary-700" />

        <UserInfo />
      </div>
    </main>
  );
}
