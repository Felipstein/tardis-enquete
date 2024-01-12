import { ComponentProps, forwardRef } from 'react';

import { AlertCircle } from 'lucide-react';
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

type InputInputProps = OmitTyped<ComponentProps<'input'>, 'disabled'> & {
  fullRounded?: boolean;
  isFocused?: boolean;
};

const InputInput = forwardRef<HTMLInputElement, InputInputProps>(
  ({ fullRounded = false, isFocused = false, className, ...props }, ref) => (
    <input
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
  ),
);

// -----------

type InputErrorFeedbackProps = ComponentProps<'span'>;

const InputErrorFeedback = forwardRef<HTMLSpanElement, InputErrorFeedbackProps>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={w('mt-1 flex items-center gap-1.5 text-sm text-red-500', className)} {...props}>
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />

      {children}
    </span>
  ),
);

// -----------

export const Input = {
  Root: InputRoot,
  Box: InputBox,
  Input: InputInput,
  ErrorFeedback: InputErrorFeedback,
};
