import * as RadixDialog from '@radix-ui/react-dialog';
import { ComponentProps, forwardRef } from 'react';
import { X } from 'lucide-react';
import { w } from '@/utils/w';

export type DialogRootProps = ComponentProps<typeof RadixDialog.Root>;

function DialogRoot(props: DialogRootProps) {
  return <RadixDialog.Root {...props} />;
}

export type DialogTriggerProps = ComponentProps<typeof RadixDialog.Trigger>;

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>((props, ref) => (
  <RadixDialog.Trigger ref={ref} {...props} />
));

export type DialogCloseProps = ComponentProps<typeof RadixDialog.Close>;

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>((props, ref) => (
  <RadixDialog.Close ref={ref} {...props} />
));

export type DialogContentProps = ComponentProps<typeof RadixDialog.Content> & {
  hideCloseButton?: boolean;
  overlay1ClassName?: string;
  overlay2ClassName?: string;
};

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ hideCloseButton = false, className, overlay1ClassName, overlay2ClassName, children, ...props }, ref) => (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={w('fixed inset-0 z-40 bg-primary-900/40 backdrop-blur-sm', overlay1ClassName)} />
      <RadixDialog.Overlay
        className={w('fixed inset-0 z-40 bg-gradient-to-br from-black/30 to-zinc-600/10', overlay2ClassName)}
      />

      <RadixDialog.Content
        ref={ref}
        className={w(
          'fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gradient-to-br from-primary-950 to-primary-900 p-[25px] shadow-md focus:outline-none',
          className,
        )}
        {...props}
      >
        {children}

        {!hideCloseButton && (
          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute right-4 top-4 text-primary-100 transition-colors hover:text-white focus:outline-none"
              aria-label="Close"
            >
              <X className="h-[18px] w-[18px]" />
            </button>
          </Dialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  ),
);

export type DialogTitleProps = ComponentProps<typeof RadixDialog.Title>;

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(({ className, ...props }, ref) => (
  <RadixDialog.Title ref={ref} className={w('text-lg font-medium text-primary-50', className)} {...props} />
));

export type DialogDescriptionProps = ComponentProps<typeof RadixDialog.Description>;

const DialogDescription = forwardRef<HTMLHeadingElement, DialogDescriptionProps>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={w('mb-5 mt-4 text-sm leading-normal text-primary-100', className)}
    {...props}
  />
));

export type DialogFooterProps = ComponentProps<'div'>;

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={w('flex justify-end gap-6', className)} {...props} />
));

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
  Footer: DialogFooter,
};
