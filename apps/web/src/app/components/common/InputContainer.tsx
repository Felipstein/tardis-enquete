import { ComponentProps, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { w } from '@/utils/w';

export type InputContainerProps = ComponentProps<'div'> & {
  fullRounded?: boolean;
  isFocused?: boolean;
  asChild?: boolean;
};

export const InputContainer = forwardRef<HTMLDivElement, InputContainerProps>(
  ({ fullRounded = false, isFocused = false, className, asChild = true, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        // @ts-expect-error
        ref={ref}
        className={w(
          'w-full border border-transparent bg-black/20 py-2.5 text-sm font-medium outline-none transition-colors placeholder:text-primary-700 focus:border-primary-500 focus:bg-primary-800/80 focus:shadow-sm focus:shadow-primary-700 focus:placeholder:text-primary-500',
          {
            'rounded-md px-3': !fullRounded,
            'rounded-full px-4': fullRounded,
            'hover:bg-black/30': !isFocused,
            'border-primary-500 bg-primary-800/80 shadow-sm shadow-primary-700 placeholder:text-primary-500': isFocused,
          },
          className,
        )}
        {...props}
      />
    );
  },
);
