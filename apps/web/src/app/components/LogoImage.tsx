import Image from 'next/image';

import { w } from '@/utils/w';

export type LogoImageProps = {
  className?: string;
  width?: number;
  height?: number;
};

export function LogoImage({ className, width = 54, height = 54 }: LogoImageProps) {
  return <Image src="/logo.gif" alt="Logo" width={width} height={height} className={w('rounded-full', className)} />;
}
