import { w } from '@/utils/w';

export type OptionProgressBarProps = {
  progress: number;
  isSelected?: boolean;
};

export function OptionProgressBar({ progress, isSelected = false }: OptionProgressBarProps) {
  return (
    <div
      className={w('relative h-2 w-full', {
        'bg-blue-800 saturate-50 group-hover:bg-blue-700': !isSelected,
        'bg-selected-gradient-progress-background group-hover:brightness-110': isSelected,
      })}
    >
      <div
        className={w('absolute h-full', {
          'bg-blue-400 group-hover:bg-blue-300': !isSelected,
          'bg-selected-gradient-progress-bar group-hover:brightness-110': isSelected,
        })}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
