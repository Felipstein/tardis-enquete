'use client';

import { AllSocketsInfo } from '@/app/components/_debug/AllSocketsInfo';
import { SocketInfo } from '@/app/components/_debug/SocketInfo';
import { usePreferencesStore } from '@/stores/PreferencesStore';

export function SocketsInfo() {
  const showSocketsSection = usePreferencesStore((s) => s.showSocketsSection);

  if (!showSocketsSection) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-4">
      <AllSocketsInfo />

      <SocketInfo />
    </div>
  );
}
