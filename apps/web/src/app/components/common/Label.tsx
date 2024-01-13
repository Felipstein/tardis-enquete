import { ComponentProps } from 'react';
import * as RadixLabel from '@radix-ui/react-label';
import { w } from '@/utils/w';

export type LabelProps = ComponentProps<typeof RadixLabel.Root> & {
  variant?: 'default' | 'danger';
  isOptional?: boolean;
};

export function Label({ variant = 'default', isOptional = false, className, children, ...props }: LabelProps) {
  return (
    <RadixLabel.Root
      className={w(
        'text-sm font-medium',
        {
          'text-primary-100': variant === 'default',
          'text-red-400': variant === 'danger',
          'flex items-center gap-1.5': isOptional,
        },
        className,
      )}
      {...props}
    >
      {children}

      {isOptional && <small className="text-xs italic text-primary-300">Opcional</small>}
    </RadixLabel.Root>
  );
}
