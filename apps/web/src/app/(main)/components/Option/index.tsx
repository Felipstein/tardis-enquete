import { PollTimeline } from '@tardis-enquete/contracts';

import { OptionProgressBar } from './OptionProgressBar';

import { w } from '@/utils/w';

export type OptionProps = {
  option: PollTimeline['options'][number];
  progress: number;
  isSelected?: boolean;
  isDisabled?: boolean;
};

export function Option({ option, progress, isSelected = false, isDisabled = false }: OptionProps) {
  return (
    <button
      data-onlydisabled={isDisabled && !isSelected}
      type="button"
      className={w(
        'group relative z-10 flex w-full flex-col items-stretch overflow-hidden rounded-lg border transition-all data-[onlydisabled=true]:opacity-40 disabled:pointer-events-none',
        {
          'border-primary-500 bg-gradient-to-r from-[#334155] to-[#1E293B] hover:border-primary-300 hover:from-[#44546C] hover:to-[#1E293B]':
            !isSelected,
          'border-[#21b9eb] bg-selected-gradient-background shadow-selected hover:brightness-110': isSelected,
        },
      )}
      disabled={isDisabled}
    >
      <div className="flex w-full items-center justify-between p-4">
        <h3
          data-selected={isSelected}
          className="text-sm font-medium text-primary-50 data-[selected=true]:font-bold data-[selected=true]:text-sky-200"
        >
          {option.text}
        </h3>
        <h4
          data-selected={isSelected}
          className="text-xs font-medium text-primary-50 data-[selected=true]:font-bold data-[selected=true]:text-teal-400"
        >
          {progress}%
        </h4>
      </div>

      <OptionProgressBar progress={progress} isSelected={isSelected} />

      <div
        className={w('absolute -z-10 h-full opacity-10 blur-[2px]', {
          'bg-blue-400': !isSelected,
          'bg-selected-gradient-progress-bar': isSelected,
        })}
        style={{ width: `${progress}%` }}
      />
    </button>
  );
}
