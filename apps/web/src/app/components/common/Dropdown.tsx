import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { ComponentProps } from 'react';
import { w } from '@/utils/w';

type DropdownRootProps = ComponentProps<typeof DropdownMenu.Root>;

function DropdownRoot(props: DropdownRootProps) {
  return <DropdownMenu.Root {...props} />;
}

type DropdownTriggerProps = ComponentProps<typeof DropdownMenu.Trigger>;

function DropdownTrigger(props: DropdownTriggerProps) {
  return <DropdownMenu.Trigger {...props} />;
}

type DropdownContentProps = ComponentProps<typeof DropdownMenu.Content>;

function DropdownContent({ className, sideOffset = 5, ...props }: DropdownContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={w(
          'z-40 min-w-40 rounded-md bg-gradient-to-br from-black/50 to-gray-900/60 p-2 shadow-md backdrop-blur-sm',
          className,
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenu.Portal>
  );
}

type DropdownArrowProps = ComponentProps<typeof DropdownMenu.Arrow>;

function DropdownArrow({ className, ...props }: DropdownArrowProps) {
  return <DropdownMenu.Arrow className={w('fill-black/50', className)} {...props} />;
}

type DropdownItemProps = ComponentProps<typeof DropdownMenu.Item> & {
  variant?: 'default' | 'danger';
};

function DropdownItem({ variant = 'default', className, ...props }: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      className={w(
        'flex w-full items-center rounded px-3 py-1.5 text-sm font-normal leading-none  transition-colors',
        {
          'text-primary-50 hover:bg-primary-500/10 active:bg-primary-500/20': variant === 'default',
          'text-red-400 hover:bg-red-400/10 active:bg-red-400/20': variant === 'danger',
        },
        className,
      )}
      {...props}
    />
  );
}

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Arrow: DropdownArrow,
  Item: DropdownItem,
};
