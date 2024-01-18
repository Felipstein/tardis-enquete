import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { OmitTyped } from '@/utils/OmitTyped';
import { w } from '@/utils/w';

export type BackButtonProps = OmitTyped<ComponentProps<typeof Link>, 'children'>;

export function BackButton({ className, ...props }: BackButtonProps) {
  return (
    <Link className={w('absolute -left-8 top-px', className)} {...props}>
      <ArrowLeft className="h-6 w-6 text-primary-100 transition-colors hover:text-white" />
    </Link>
  );
}
