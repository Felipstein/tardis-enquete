import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { ComponentProps, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { Label, LabelProps } from './Label';
import { w } from '@/utils/w';
import { OmitTyped } from '@/utils/OmitTyped';

export type CheckboxRootProps = ComponentProps<'div'>;

const CheckboxRoot = forwardRef<HTMLDivElement, CheckboxRootProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={w('flex items-center gap-2.5', className)} {...props} />
));

export type CheckboxInputProps = OmitTyped<ComponentProps<typeof RadixCheckbox.Root>, 'children'>;

const CheckboxInput = forwardRef<HTMLButtonElement, CheckboxInputProps>(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={w(
      'peer flex h-[18px] w-[18px] flex-shrink-0 appearance-none items-center justify-center rounded-sm border border-primary-700 bg-primary-900 bg-primary-950/40 outline-none data-[disabled]:pointer-events-none data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-950/60 data-[disabled]:opacity-40 hover:bg-primary-950/50 data-[state=checked]:hover:bg-primary-950/70',
      className,
    )}
    {...props}
  >
    <RadixCheckbox.Indicator className="text-white">
      <Check className="h-3 w-3" strokeWidth={3} />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
));

export type CheckboxLabelProps = LabelProps;

function CheckboxLabel({ className, ...props }: CheckboxLabelProps) {
  return <Label className={w('text-primary-50 peer-data-[disabled]:opacity-40', className)} {...props} />;
}

export const Checkbox = {
  Root: CheckboxRoot,
  Input: CheckboxInput,
  Label: CheckboxLabel,
};
