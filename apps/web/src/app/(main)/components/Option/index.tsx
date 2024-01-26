'use client';

import { PollTimeline } from '@tardis-enquete/contracts';

import { OptionProgressBar } from './OptionProgressBar';

import { w } from '@/utils/w';
import { LoaderIcon } from '@/app/components/common/LoaderIcon';
import { useAdminSection } from '@/hooks/useAdminSection';

export type OptionProps = {
  isPollExpired: boolean;
  option: PollTimeline['options'][number];
  progress: number;
  isLoading?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
};

export function Option({
  isPollExpired,
  option,
  progress,
  isLoading = false,
  isSelected = false,
  isDisabled = false,
  onClick,
}: OptionProps) {
  const isAdmin = useAdminSection();

  const showProgress = isPollExpired || isAdmin;

  return (
    <button
      data-onlydisabled={(isDisabled && !isSelected) || isLoading}
      type="button"
      onClick={onClick}
      className={w(
        'group relative z-10 flex w-full flex-col items-stretch overflow-hidden rounded-lg border transition-all data-[onlydisabled=true]:opacity-40 disabled:pointer-events-none',
        {
          'border-primary-500 bg-gradient-to-r from-[#334155] to-[#1E293B] hover:border-primary-300 hover:from-[#44546C] hover:to-[#1E293B]':
            !isSelected,
          'border-[#21b9eb] bg-selected-gradient-background shadow-selected hover:brightness-110': isSelected,
        },
      )}
      disabled={isDisabled || isLoading}
    >
      <div className="flex w-full items-center justify-between p-4">
        <h3
          data-selected={isSelected}
          className="text-sm font-medium text-primary-50 data-[selected=true]:font-bold data-[selected=true]:text-sky-200"
        >
          {option.text}
        </h3>

        {showProgress && (
          <div className="flex items-center gap-2">
            {isLoading && (
              <LoaderIcon
                data-selected={isSelected}
                className="h-5 w-5 text-white data-[selected=true]:text-teal-400"
              />
            )}

            <h4
              data-selected={isSelected}
              className="text-xs font-medium text-primary-50 data-[selected=true]:font-bold data-[selected=true]:text-teal-400"
            >
              {progress}%
            </h4>
          </div>
        )}
      </div>

      {showProgress && (
        <>
          <OptionProgressBar progress={progress} isSelected={isSelected} />

          <div
            className={w('absolute -z-10 h-full opacity-10 blur-[2px]', {
              'bg-blue-400': !isSelected,
              'bg-selected-gradient-progress-bar': isSelected,
            })}
            style={{ width: `${progress}%` }}
          />
        </>
      )}
    </button>
  );
}
