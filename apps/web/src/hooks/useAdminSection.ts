'use client';

import { useUser } from './useUser';

export function useAdminSection() {
  const { status, user } = useUser();

  const isAdminUser = status === 'authenticated' && (user.role === 'admin' || user.role === 'developer');

  return isAdminUser;
}
