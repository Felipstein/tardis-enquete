import { Loader } from 'lucide-react';
import { ComponentProps } from 'react';

import { w } from '@/utils/w';

export type LoaderIconProps = ComponentProps<typeof Loader>;

export function LoaderIcon({ className, ...props }: LoaderIconProps) {
  return <Loader className={w('h-4 w-4 animate-spin', className)} {...props} />;
}
