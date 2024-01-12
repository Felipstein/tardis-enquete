import { ComponentProps } from 'react';
import * as RadixLabel from '@radix-ui/react-label';
import { w } from '@/utils/w';

export type LabelProps = ComponentProps<typeof RadixLabel.Root> & {
  variant?: 'default' | 'danger';
};

export function Label({ variant = 'default', className, ...props }: LabelProps) {
  return (
    <RadixLabel.Root
      className={w(
        'text-sm font-medium',
        { 'text-primary-100': variant === 'default', 'text-red-400': variant === 'danger' },
        className,
      )}
      {...props}
    />
  );
}
