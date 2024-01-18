'use client';

import { DebugContainer } from '@/app/components/DebugContainer';
import { usePreferencesStore } from '@/stores/PreferencesStore';

export function DebugSection() {
  const showDebugPanel = usePreferencesStore((s) => s.showDebugPanel);

  if (!showDebugPanel) {
    return null;
  }

  return <DebugContainer />;
}
