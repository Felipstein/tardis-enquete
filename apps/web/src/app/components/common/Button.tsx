'use client';

import { Slot } from '@radix-ui/react-slot';
import { useState, type ComponentProps, type MouseEvent, ComponentType } from 'react';

import { LoaderIcon } from './LoaderIcon';

import type { OmitTyped } from '@/utils/OmitTyped';

import { w } from '@/utils/w';

export type ButtonVariant = 'clean' | 'primary' | 'danger';

export type ButtonSize = 'md' | 'sm';

export type ButtonProps = OmitTyped<ComponentProps<'button'>, 'onClick' | 'disabled'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<any> | any;
  isDisabled?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
  ignoreOnClickPromise?: boolean;
  icon?: ComponentType<{ className?: string }>;
};

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  isDisabled = false,
  isLoading: isPropLoading = false,
  asChild = false,
  ignoreOnClickPromise = false,
  icon: DefaultIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const [isInternalLoading, setIsInternalLoading] = useState(false);

  const Comp = (asChild ? Slot : 'button') as unknown as 'button';

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (!onClick) {
      return;
    }

    const result = onClick(event);

    if (result instanceof Promise && !ignoreOnClickPromise) {
      setIsInternalLoading(true);

      result.finally(() => {
        setIsInternalLoading(false);
      });
    }
  }

  const isLoading = isPropLoading || isInternalLoading;

  const Icon = isLoading ? LoaderIcon : DefaultIcon;

  return (
    <Comp
      type={type}
      disabled={isDisabled || isLoading}
      className={w(
        'flex cursor-pointer items-center justify-center disabled:pointer-events-none disabled:opacity-40',
        {
          'bg-gradient-to-br from-blue-500 to-blue-400 text-white shadow-md shadow-blue-950 transition-all hover:shadow-lg hover:shadow-blue-700/40 hover:brightness-110':
            variant === 'primary',
          'bg-gradient-to-br from-red-500 to-red-400 text-white shadow-md shadow-red-950 transition-all hover:shadow-lg hover:shadow-red-700/40 hover:brightness-110':
            variant === 'danger',
        },
        {
          'gap-2 rounded-md px-3 py-2': size === 'md',
          'gap-2 rounded-md px-2.5 py-2 text-sm': size === 'sm',
        },
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {asChild ? (
        <Comp>
          <div className={w((isDisabled || isLoading) && 'pointer-events-none opacity-40')}>
            {Icon && <Icon className="h-5 w-5" />}

            {children}
          </div>
        </Comp>
      ) : (
        <>
          {Icon && <Icon className="h-5 w-5" />}

          {children}
        </>
      )}
    </Comp>
  );
}
