'use client';

import { ExpandPopup } from './ExpandPopup';
import { Button } from './common/Button';
import { queryClient } from '@/libs/queryClient';

export function DebugContainer() {
  return (
    <ExpandPopup title="Dev Panel" className="bottom-6 left-4">
      <Button onClick={() => queryClient.invalidateQueries()}>Invalidar todos Caches</Button>
    </ExpandPopup>
  );
}
