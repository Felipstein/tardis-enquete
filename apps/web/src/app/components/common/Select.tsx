import * as RadixSelect from '@radix-ui/react-select';
import { ComponentProps, forwardRef } from 'react';
import { CheckIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { InputContainer } from './InputContainer';
import { LoaderIcon } from './LoaderIcon';
import { w } from '@/utils/w';
import { OmitTyped } from '@/utils/OmitTyped';

export type SelectRootProps = ComponentProps<typeof RadixSelect.Root>;

function SelectRoot(props: SelectRootProps) {
  return <RadixSelect.Root {...props} />;
}

export type SelectTriggerProps = OmitTyped<ComponentProps<typeof RadixSelect.Trigger>, 'asChild'> & {
  placeholder?: string;
  loadingPlaceholder?: string;
  isLoading?: boolean;
  error?: string;
};

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ placeholder, className, loadingPlaceholder, isLoading = false, disabled = false, error, ...props }, ref) => (
    <RadixSelect.Trigger ref={ref} disabled={disabled || isLoading || !!error} asChild {...props}>
      <InputContainer
        asChild={false}
        className={w(
          'group relative flex cursor-pointer items-center justify-between',
          !!error && 'text-red-500',
          className,
        )}
      >
        <RadixSelect.Value placeholder={error || (isLoading ? loadingPlaceholder : placeholder)} />

        <RadixSelect.Icon>{isLoading ? <LoaderIcon /> : <ChevronDown />}</RadixSelect.Icon>
      </InputContainer>
    </RadixSelect.Trigger>
  ),
);

export type SelectContentProps = ComponentProps<typeof RadixSelect.Content>;

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(({ className, children, ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      position="popper"
      className={w(
        'z-40 min-w-40 overflow-hidden rounded-md bg-gradient-to-br from-black/50 to-gray-900/60 p-2 shadow-md backdrop-blur-md',
        className,
      )}
      {...props}
    >
      <RadixSelect.ScrollUpButton className="flex items-center justify-center rounded-md bg-gradient-to-br from-gray-700/20 to-gray-900/30 p-2 shadow-md backdrop-blur-sm">
        <ChevronUp />
      </RadixSelect.ScrollUpButton>

      <RadixSelect.Viewport>{children}</RadixSelect.Viewport>

      <RadixSelect.ScrollDownButton className="flex items-center justify-center rounded-md bg-gradient-to-br from-gray-700/20 to-gray-900/30 p-2 shadow-md backdrop-blur-sm">
        <ChevronDown />
      </RadixSelect.ScrollDownButton>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));

export type SelectGroupProps = ComponentProps<typeof RadixSelect.Group>;

const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>((props, ref) => (
  <RadixSelect.Group ref={ref} {...props} />
));

export type SelectItemProps = ComponentProps<typeof RadixSelect.Item>;

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={w(
      'relative flex w-full cursor-pointer items-center rounded py-2 pl-6 pr-9 text-sm font-normal leading-none text-primary-50 outline-none transition-colors data-[state=checked]:font-medium hover:bg-primary-500/10 data-[state=checked]:hover:bg-teal-500/10 active:bg-primary-500/20',
      className,
    )}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    <RadixSelect.ItemIndicator className="absolute left-1 inline-flex h-4 w-4 items-center justify-center text-teal-400">
      <CheckIcon />
    </RadixSelect.ItemIndicator>
  </RadixSelect.Item>
));

export type SelectButtonProps = ComponentProps<'button'> & {
  asChild?: boolean;
};

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      // @ts-expect-error
      // eslint-disable-next-line prettier/prettier
      <Comp ref={ref}
        className={w(
          'buttons-center relative flex w-full cursor-pointer rounded py-2 pl-6 pr-9 text-sm font-normal leading-none text-primary-50 outline-none transition-colors data-[state=checked]:font-medium hover:bg-primary-500/10 data-[state=checked]:hover:bg-teal-500/10 active:bg-primary-500/20',
          className,
        )}
        {...props}
      />
    );
  },
);

export type SelectSeparatorProps = ComponentProps<typeof RadixSelect.Separator>;

const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(({ className, ...props }, ref) => (
  <RadixSelect.Separator ref={ref} className={w('m-1.5 h-px bg-primary-500/20', className)} {...props} />
));

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Group: SelectGroup,
  Item: SelectItem,
  Button: SelectButton,
  Separator: SelectSeparator,
};
