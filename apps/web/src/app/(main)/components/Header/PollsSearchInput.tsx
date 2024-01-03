'use client';

import { SearchInput } from '@/app/components/common/SearchInput';
import { usePollsSearchStore } from '@/stores/PollsSearchStore';

export function PollsSearchInput() {
  const { searchInput, setSearchInput } = usePollsSearchStore();

  return <SearchInput shortcut value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />;
}
