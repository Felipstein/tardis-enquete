'use client';

import { LayoutGrid, List } from 'lucide-react';
import { Toggle } from '@/app/components/common/Toggle';
import { usePollsListGridTemplate } from '@/stores/PollsListGridTemplate';

export function HeaderSettings() {
  const { gridTemplate, setGridTemplate } = usePollsListGridTemplate();

  return (
    <div className="hidden items-stretch sm:flex">
      <Toggle
        pressed={gridTemplate === 'grid'}
        onPressedChange={() => setGridTemplate('grid')}
        cannotDisable
        title="Exibir em formato de grade"
        className="rounded-none rounded-l-md"
      >
        <LayoutGrid className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={gridTemplate === 'row'}
        onPressedChange={() => setGridTemplate('row')}
        cannotDisable
        title="Exibir em formato de lista"
        className="rounded-none rounded-r-md"
      >
        <List className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
