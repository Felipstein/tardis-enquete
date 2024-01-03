import { create } from 'zustand';

export interface PollsSearchStore {
  searchInput: string;

  setSearchInput: (searchInput: string) => void;
}

export const usePollsSearchStore = create<PollsSearchStore>((set) => ({
  searchInput: '',

  setSearchInput: (searchInput) => set(() => ({ searchInput })),
}));
