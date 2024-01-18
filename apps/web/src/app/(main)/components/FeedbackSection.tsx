'use client';

import { FeedbackContainer } from '@/app/components/FeedbackContainer';
import { usePreferencesStore } from '@/stores/PreferencesStore';

export function FeedbackSection() {
  const showFeedbackPopup = usePreferencesStore((s) => s.showFeedbackPopup);

  if (!showFeedbackPopup) {
    return null;
  }

  return <FeedbackContainer />;
}
