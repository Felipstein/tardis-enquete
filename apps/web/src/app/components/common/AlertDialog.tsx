import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { ComponentProps, forwardRef } from 'react';
import { Button } from './Button';
import { w } from '@/utils/w';

export type AlertDialogRootProps = ComponentProps<typeof RadixAlertDialog.Root>;

function AlertDialogRoot(props: AlertDialogRootProps) {
  return <RadixAlertDialog.Root {...props} />;
}

export type AlertDialogTriggerProps = ComponentProps<typeof RadixAlertDialog.Trigger>;

const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>((props, ref) => (
  <RadixAlertDialog.Trigger ref={ref} {...props} />
));

export type AlertDialogContentProps = ComponentProps<typeof RadixAlertDialog.Content> & {
  overlay1ClassName?: string;
  overlay2ClassName?: string;
};

const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className, overlay1ClassName, overlay2ClassName, ...props }, ref) => (
    <RadixAlertDialog.Portal>
      <RadixAlertDialog.Overlay
        className={w('fixed inset-0 z-40 bg-primary-900/40 backdrop-blur-sm', overlay1ClassName)}
      />
      <RadixAlertDialog.Overlay
        className={w('fixed inset-0 z-40 bg-gradient-to-br from-black/30 to-zinc-600/10', overlay2ClassName)}
      />

      <RadixAlertDialog.Content
        ref={ref}
        className={w(
          'fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gradient-to-br from-primary-950 to-primary-900 p-[25px] shadow-md focus:outline-none',
          className,
        )}
        {...props}
      />
    </RadixAlertDialog.Portal>
  ),
);

export type AlertDialogTitleProps = ComponentProps<typeof RadixAlertDialog.Title>;

const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(({ className, ...props }, ref) => (
  <RadixAlertDialog.Title ref={ref} className={w('text-lg font-medium text-primary-50', className)} {...props} />
));

export type AlertDialogDescriptionProps = ComponentProps<typeof RadixAlertDialog.Description>;

const AlertDialogDescription = forwardRef<HTMLHeadingElement, AlertDialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <RadixAlertDialog.Description
      ref={ref}
      className={w('mb-5 mt-4 text-sm leading-normal text-primary-100', className)}
      {...props}
    />
  ),
);

export type AlertDialogFooterProps = ComponentProps<'div'>;

const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={w('flex justify-end gap-6', className)} {...props} />
));

export type AlertDialogCancelProps = ComponentProps<typeof RadixAlertDialog.Cancel> & {
  label?: string;
};

const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ label = 'Cancelar', children, ...props }, ref) => {
    if (children) {
      return (
        <RadixAlertDialog.Cancel ref={ref} {...props}>
          {children}
        </RadixAlertDialog.Cancel>
      );
    }

    return (
      <RadixAlertDialog.Cancel ref={ref} asChild {...props}>
        <Button variant="ghost">{label}</Button>
      </RadixAlertDialog.Cancel>
    );
  },
);

export type AlertDialogActionProps = ComponentProps<typeof RadixAlertDialog.Action> & {
  label?: string;
  danger?: boolean;
};

const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ label = 'Confirmar', danger = false, children, ...props }, ref) => {
    if (children) {
      return (
        <RadixAlertDialog.Action ref={ref} {...props}>
          {children}
        </RadixAlertDialog.Action>
      );
    }

    return (
      <RadixAlertDialog.Action ref={ref} asChild {...props}>
        <Button variant={danger ? 'danger' : 'primary'}>{label}</Button>
      </RadixAlertDialog.Action>
    );
  },
);

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Cancel: AlertDialogCancel,
  Action: AlertDialogAction,
};
