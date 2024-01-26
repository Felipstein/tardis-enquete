import { create } from 'zustand';

export type GridTemplate = 'grid' | 'row';

export interface PreferencesStore {
  showFeedbackPopup: boolean;
  setShowFeedbackPopup: (showFeedbackPopup: boolean) => void;

  showResults: boolean;
  setShowResults: (showResults: boolean) => void;

  gridTemplate: GridTemplate;
  setGridTemplate: (gridTemplate: GridTemplate) => void;

  showSocketsSection: boolean;
  setShowSocketsSection: (showSocketsSection: boolean) => void;

  showDebugPanel: boolean;
  setShowDebugPanel: (showDebugPanel: boolean) => void;
}

export const usePreferencesStore = create<PreferencesStore>((set) => ({
  showFeedbackPopup: true,
  setShowFeedbackPopup: (showFeedbackPopup) => set(() => ({ showFeedbackPopup })),

  showResults: true,
  setShowResults: (showResults) => set(() => ({ showResults })),

  gridTemplate: 'row',
  setGridTemplate: (gridTemplate) => set(() => ({ gridTemplate })),

  showSocketsSection: false,
  setShowSocketsSection: (showSocketsSection) => set(() => ({ showSocketsSection })),

  showDebugPanel: false,
  setShowDebugPanel: (showDebugPanel) => set(() => ({ showDebugPanel })),
}));
