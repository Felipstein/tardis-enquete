import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { ComponentProps, ElementType } from 'react';
import { Check, Dot } from 'lucide-react';
import { w } from '@/utils/w';

type DropdownRootProps = ComponentProps<typeof DropdownMenu.Root>;

function DropdownRoot(props: DropdownRootProps) {
  return <DropdownMenu.Root {...props} />;
}

type DropdownTriggerProps = ComponentProps<typeof DropdownMenu.Trigger>;

function DropdownTrigger(props: DropdownTriggerProps) {
  return <DropdownMenu.Trigger {...props} />;
}

type DropdownContentProps = ComponentProps<typeof DropdownMenu.Content> & {
  hideDefaultArrow?: boolean;
};

function DropdownContent({
  hideDefaultArrow = false,
  className,
  sideOffset = 5,
  children,
  ...props
}: DropdownContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={w(
          'z-40 min-w-40 rounded-md bg-gradient-to-br from-black/50 to-gray-900/60 p-2 shadow-md backdrop-blur-sm',
          className,
        )}
        sideOffset={sideOffset}
        {...props}
      >
        {!hideDefaultArrow && <DropdownArrow />}

        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

type DropdownArrowProps = ComponentProps<typeof DropdownMenu.Arrow>;

function DropdownArrow({ className, ...props }: DropdownArrowProps) {
  return <DropdownMenu.Arrow className={w('fill-black/50', className)} {...props} />;
}

type DropdownLabelProps = ComponentProps<typeof DropdownMenu.Label> & {
  hasItemIndicator?: boolean;
};

function DropdownLabel({ hasItemIndicator = false, className, ...props }: DropdownLabelProps) {
  return (
    <DropdownMenu.Label
      className={w('select-none px-3 text-xs leading-6 text-primary-300', hasItemIndicator && 'pl-6', className)}
      {...props}
    />
  );
}

type DropdownItemProps = ComponentProps<typeof DropdownMenu.Item> & {
  variant?: 'default' | 'danger';
};

function DropdownItem({ variant = 'default', className, ...props }: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      className={w(
        'relative flex w-full items-center rounded px-3 py-2 text-sm font-normal leading-none outline-none transition-colors',
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

type DropdownCheckboxItemProps = ComponentProps<typeof DropdownMenu.CheckboxItem> & {
  variant?: 'default' | 'danger';
};

function DropdownCheckboxItem({ variant = 'default', className, ...props }: DropdownCheckboxItemProps) {
  return (
    <DropdownMenu.CheckboxItem
      className={w(
        'relative flex w-full cursor-pointer items-center rounded px-3 py-2 pl-6 text-sm font-normal leading-none outline-none transition-colors',
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

type DropdownRadioGroupProps = ComponentProps<typeof DropdownMenu.RadioGroup>;

function DropdownRadioGroup(props: DropdownRadioGroupProps) {
  return <DropdownMenu.RadioGroup {...props} />;
}

type DropdownRadioItemProps = ComponentProps<typeof DropdownMenu.RadioItem> & {
  variant?: 'default' | 'danger';
};

function DropdownRadioItem({ variant = 'default', className, ...props }: DropdownRadioItemProps) {
  return (
    <DropdownMenu.RadioItem
      className={w(
        'relative flex w-full cursor-pointer items-center rounded px-3 py-2 pl-6 text-sm font-normal leading-none outline-none transition-colors',
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

type DropdownItemIndicatorProps = Omit<ComponentProps<typeof DropdownMenu.ItemIndicator>, 'children'> & {
  icon?: ElementType<{ className?: string }>;
  iconType?: 'check' | 'radio';
};

function DropdownItemIndicator({ className, iconType, icon: Icon, ...props }: DropdownItemIndicatorProps) {
  if (!iconType && !Icon) {
    throw new Error('Either icon or iconType must be provided');
  }

  if (iconType && Icon) {
    throw new Error('Both icon and iconType cannot be provided');
  }

  return (
    <DropdownMenu.ItemIndicator
      className={w('absolute left-0 inline-flex w-6 items-center justify-center', className)}
      {...props}
    >
      {iconType === 'check' && <Check className="h-3.5 w-3.5 text-teal-400" />}

      {iconType === 'radio' && <Dot className="h-10 w-10 text-teal-400" />}

      {Icon && <Icon className="h-3.5 w-3.5 text-teal-400" />}
    </DropdownMenu.ItemIndicator>
  );
}

type DropdownItemIconProps = {
  src: ElementType<{ className?: string }>;
  className?: string;
};

function DropdownItemIcon({ src: Icon, className }: DropdownItemIconProps) {
  return <Icon className={w('h-3.5 w-3.5 opacity-80', className)} />;
}

type DropdownSeparatorProps = ComponentProps<typeof DropdownMenu.Separator>;

function DropdownSeparator({ className, ...props }: DropdownSeparatorProps) {
  return <DropdownMenu.Separator className={w('m-1.5 h-px bg-primary-500/20', className)} {...props} />;
}

export const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Arrow: DropdownArrow,
  Label: DropdownLabel,
  Item: DropdownItem,
  CheckboxItem: DropdownCheckboxItem,
  RadioGroup: DropdownRadioGroup,
  RadioItem: DropdownRadioItem,
  ItemIndicator: DropdownItemIndicator,
  ItemIcon: DropdownItemIcon,
  Separator: DropdownSeparator,
};
