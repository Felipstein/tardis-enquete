'use client';

import { usePathname } from 'next/navigation';
import { SearchInput } from '@/app/components/common/SearchInput';
import { usePollsSearchStore } from '@/stores/PollsSearchStore';

export function PollsSearchInput() {
  const pathname = usePathname();

  const { searchInput, setSearchInput } = usePollsSearchStore();

  if (pathname !== '/') {
    return null;
  }

  return (
    <div className="hidden w-full max-w-[400px] sm:absolute sm:left-1/2 sm:block sm:-translate-x-1/2">
      <SearchInput shortcut value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
    </div>
  );
}
