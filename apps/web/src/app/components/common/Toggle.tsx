import * as RadixToggle from '@radix-ui/react-toggle';
import { ComponentProps } from 'react';
import { w } from '@/utils/w';

export type ToggleProps = ComponentProps<typeof RadixToggle.Root> & {
  cannotDisable?: boolean;
};

export function Toggle({ cannotDisable = false, className, ...props }: ToggleProps) {
  return (
    <RadixToggle.Root
      className={w(
        'rounded-md border border-transparent bg-black/20 p-2 transition-colors data-[state=on]:bg-primary-100 data-[state=on]:text-primary-950 hover:bg-black/30 hover:duration-75 data-[state=on]:hover:bg-primary-50 active:bg-primary-800/80 active:text-white active:shadow-sm active:shadow-primary-700 data-[state=off]:active:border-primary-500 data-[state=on]:active:bg-white data-[state=on]:active:text-black',
        cannotDisable && 'data-[state=on]:pointer-events-none',
        className,
      )}
      {...props}
    />
  );
}
