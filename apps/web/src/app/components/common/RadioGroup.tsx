import React, { ComponentProps } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { Label, LabelProps } from './Label';
import { w } from '@/utils/w';
import { OmitTyped } from '@/utils/OmitTyped';

export type RadioGroupRootProps = ComponentProps<typeof RadixRadioGroup.Root>;

function RadioGroupRoot({ className, ...props }: RadioGroupRootProps) {
  return <RadixRadioGroup.Root className={w('flex flex-col gap-2.5', className)} {...props} />;
}

export type RadioGroupRawItemProps = ComponentProps<typeof RadixRadioGroup.Item>;

function RadioGroupRawItem({ className, ...props }: RadioGroupRawItemProps) {
  return (
    <RadixRadioGroup.Item
      className={w(
        'bg-primary-950/40 hover:bg-primary-950/50 data-[state=checked]:bg-primary-950/60 data-[state=checked]:hover:bg-primary-950/70 group h-5 w-5 flex-shrink-0 rounded-full border border-primary-700 p-1 outline-none data-[state=checked]:border-primary-500',
        className,
      )}
      {...props}
    />
  );
}

export type RadioGroupRawIndicatorProps = OmitTyped<ComponentProps<typeof RadixRadioGroup.Indicator>, 'children'>;

function RadioGroupRawIndicator({ className, ...props }: RadioGroupRawIndicatorProps) {
  return (
    <RadixRadioGroup.Indicator
      className={w(
        'relative flex h-full w-full items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary-50',
        className,
      )}
      {...props}
    />
  );
}

export type RadioGroupItemProps = ComponentProps<'div'>;

function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return <div className={w('flex items-center gap-2', className)} {...props} />;
}

export type RadioGroupInputProps = OmitTyped<RadioGroupRawItemProps, 'children'>;

function RadioGroupInput(props: RadioGroupInputProps) {
  return (
    <RadioGroupRawItem {...props}>
      <RadioGroupRawIndicator />
    </RadioGroupRawItem>
  );
}

export type RadioGroupLabelProps = LabelProps;

function RadioGroupLabel({ className, ...props }: RadioGroupLabelProps) {
  return <Label className={w('group-data-[state=checked]:text-white', className)} {...props} />;
}

export const RadioGroup = {
  Root: RadioGroupRoot,
  RawItem: RadioGroupRawItem,
  RawIndicator: RadioGroupRawIndicator,
  Item: RadioGroupItem,
  Input: RadioGroupInput,
  Label: RadioGroupLabel,
};
