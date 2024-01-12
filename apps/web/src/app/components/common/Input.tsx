import { ComponentProps, forwardRef } from 'react';

import { AlertCircle } from 'lucide-react';
import { InputContainer, InputContainerProps } from './InputContainer';
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

type InputInputProps = OmitTyped<ComponentProps<'input'>, 'disabled'> & InputContainerProps;

const InputInput = forwardRef<HTMLInputElement, InputInputProps>(({ fullRounded, isFocused, ...props }, ref) => (
  <InputContainer fullRounded={fullRounded} isFocused={isFocused}>
    <input ref={ref} {...props} />
  </InputContainer>
));

// -----------

type InputErrorFeedbackProps = ComponentProps<'span'>;

const InputErrorFeedback = forwardRef<HTMLSpanElement, InputErrorFeedbackProps>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={w('mt-1 flex items-center gap-1.5 text-sm text-red-500 truncate', className)} {...props}>
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
