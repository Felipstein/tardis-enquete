import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

export const w = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));
