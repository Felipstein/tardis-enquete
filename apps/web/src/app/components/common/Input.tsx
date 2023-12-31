import { ComponentProps, forwardRef } from 'react';

import { OmitTyped } from '@/utils/OmitTyped';
import { w } from '@/utils/w';

// -----------

type InputRootProps = ComponentProps<'div'> & {
  isDisabled?: boolean;
  isLoading?: boolean;
};

const InputRoot = forwardRef<HTMLDivElement, InputRootProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={w('relative', className)} {...props} />
));

// -----------

type InputBoxProps = ComponentProps<'div'> & {
  left?: boolean;
  right?: boolean;
};

const InputBox = forwardRef<HTMLDivElement, InputBoxProps>(
  ({ className, left = false, right = false, ...props }, ref) => {
    if (left && right) {
      throw new Error('Left and right cannot be true at the same time.');
    }

    return (
      <div
        ref={ref}
        className={w(
          'pointer-events-none absolute inset-y-0 flex items-center',
          left && 'left-0 pl-3',
          right && 'right-0 pr-3',
          className,
        )}
        {...props}
      />
    );
  },
);

// -----------

type InputInputProps = OmitTyped<ComponentProps<'input'>, 'disabled'>;

const InputInput = forwardRef<HTMLInputElement, InputInputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={w(
      'w-full rounded-full border border-transparent bg-black/20 px-4 py-2.5 text-sm font-medium outline-none transition-colors placeholder:text-primary-700 hover:bg-black/30 focus:border-primary-500 focus:bg-primary-800/80 focus:shadow-sm focus:shadow-primary-700 focus:placeholder:text-primary-500',
      className,
    )}
    {...props}
  />
));

// -----------

export const Input = {
  Root: InputRoot,
  Box: InputBox,
  Input: InputInput,
};
