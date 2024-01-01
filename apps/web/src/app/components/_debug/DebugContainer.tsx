import { ComponentProps } from 'react';

import { w } from '@/utils/w';

export type DebugContainerProps = ComponentProps<'div'>;

export function DebugContainer({ className, ...props }: DebugContainerProps) {
  return (
    <div
      className={w('rounded-md border-2 border-gray-900 bg-black/80 px-4 py-2.5 backdrop-blur-sm', className)}
      {...props}
    />
  );
}
