import { create } from 'zustand';

export interface PollsListGridTemplate {
  gridTemplate: 'grid' | 'row';
  setGridTemplate: (gridTemplate: 'grid' | 'row') => void;
}

export const usePollsListGridTemplate = create<PollsListGridTemplate>((set) => ({
  gridTemplate: 'row',

  setGridTemplate: (gridTemplate) => set(() => ({ gridTemplate })),
}));
