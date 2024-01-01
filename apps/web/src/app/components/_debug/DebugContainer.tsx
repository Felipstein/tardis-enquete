import { ComponentProps } from 'react';

import { w } from '@/utils/w';

export type DebugContainerProps = ComponentProps<'div'>;

export function DebugContainer({ className, children, ...props }: DebugContainerProps) {
  return (
    <div
      className={w(
        'relative overflow-hidden rounded-md border-2 border-gray-900 bg-black/80 px-4 py-2.5 backdrop-blur-sm',
        className,
      )}
      {...props}
    >
      {children}

      <span className="pointer-events-none absolute right-8 top-1/2 -z-10 -translate-y-1/2 -rotate-[35deg] text-3xl font-semibold opacity-10">
        Debug
      </span>
    </div>
  );
}
