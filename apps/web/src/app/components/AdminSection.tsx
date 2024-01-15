'use client';

import { ReactNode } from 'react';

import { useAdminSection } from '@/hooks/useAdminSection';

export type AdminSectionProps = {
  children: ReactNode;
};

export function AdminSection({ children }: AdminSectionProps) {
  const isAdminUser = useAdminSection();

  if (!isAdminUser) {
    return null;
  }

  return children;
}
