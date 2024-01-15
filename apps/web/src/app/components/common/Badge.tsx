import { ComponentProps } from 'react';
import { w } from '@/utils/w';

export type BadgeProps = ComponentProps<'div'> & {
  color?: string;
};

export function Badge({ color = 'primary', className, ...props }: BadgeProps) {
  return (
    <div
      className={w(
        'rounded-full border px-2 py-0.5 text-sm',
        {
          [`border-${color}-500 bg-${color}-500/30`]: true,
        },
        className,
      )}
      {...props}
    />
  );
}
