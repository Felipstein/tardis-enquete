import { ComponentProps, forwardRef } from 'react';

import { AlertCircle } from 'lucide-react';
import { InputContainer, InputContainerProps } from './InputContainer';
import { OmitTyped } from '@/utils/OmitTyped';
import { w } from '@/utils/w';

// -----------

type TextAreaRootProps = ComponentProps<'div'> & {
  isDisabled?: boolean;
  isLoading?: boolean;
};

const TextAreaRoot = forwardRef<HTMLDivElement, TextAreaRootProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={w('relative', className)} {...props} />
));

// -----------

type TextAreaBoxProps = ComponentProps<'div'> & {
  left?: boolean;
  right?: boolean;
};

const TextAreaBox = forwardRef<HTMLDivElement, TextAreaBoxProps>(
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

type TextAreaInputProps = OmitTyped<ComponentProps<'textarea'>, 'disabled'> & InputContainerProps;

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ fullRounded, isFocused, className, disabled, ...props }, ref) => (
    <InputContainer fullRounded={fullRounded} disabled={disabled} isFocused={isFocused}>
      <textarea
        ref={ref}
        disabled={disabled}
        className={w('min-h-[42px] scrollbar-thin scrollbar-track-primary-800 scrollbar-thumb-primary-500', className)}
        {...props}
      />
    </InputContainer>
  ),
);

// -----------

type TextAreaErrorFeedbackProps = ComponentProps<'span'>;

const TextAreaErrorFeedback = forwardRef<HTMLSpanElement, TextAreaErrorFeedbackProps>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={w('mt-1 flex items-center gap-1.5 truncate text-sm text-red-500', className)} {...props}>
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />

      {children}
    </span>
  ),
);

// -----------

export const TextArea = {
  Root: TextAreaRoot,
  Box: TextAreaBox,
  Input: TextAreaInput,
  ErrorFeedback: TextAreaErrorFeedback,
};
