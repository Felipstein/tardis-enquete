import { UserInfo } from '../UserInfo';

import { SearchInput } from '@/app/components/common/SearchInput';
import { LogoImage } from '@/app/components/LogoImage';

export function HeaderContent() {
  return (
    <main className="flex h-full w-full max-w-[1980px] items-center justify-between p-4 sm:px-10 sm:py-6">
      <div className="flex items-center gap-2.5">
        <LogoImage width={42} height={42} />

        <h1 className="text-xl font-bold uppercase tracking-wide text-primary-50">TARDIS</h1>
      </div>

      <div className="hidden w-full max-w-[400px] sm:absolute sm:left-1/2 sm:block sm:-translate-x-1/2">
        <SearchInput shortcut />
      </div>

      <UserInfo />
    </main>
  );
}
