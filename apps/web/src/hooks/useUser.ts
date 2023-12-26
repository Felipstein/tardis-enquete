'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import type { User } from '@tardis-enquete/contracts';

import { queryKeys } from '@/config/queryKeys';

type UserPayloadAuthenticated = {
  status: 'authenticated';
  user: User;
};

type UserPayloadLoading = {
  status: 'loading';
  user: User | null;
};

type UserPayloadAuthenticatedOrLoading = UserPayloadAuthenticated | UserPayloadLoading;

type UserPayloadUnauthenticated = {
  status: 'unauthenticated';
  user: null;
};

export type UserPayload<TRequireAuthenticated extends boolean> = TRequireAuthenticated extends true
  ? UserPayloadAuthenticatedOrLoading
  : UserPayloadAuthenticatedOrLoading | UserPayloadUnauthenticated;

// @ts-expect-error
export function useUser<TRequireAuthenticated extends boolean>(requireAuthenticated: TRequireAuthenticated = false) {
  const { push } = useRouter();

  const { data: user = null, isLoading } = useQuery<User | null>({
    queryKey: queryKeys.me(),
    queryFn: () =>
      fetch('/api/me')
        .then((response) => response.json())
        .then((data) => data.user),
  });

  // @ts-expect-error
  const useUserPayload = useMemo<UserPayload<TRequireAuthenticated>>(() => {
    if (isLoading) {
      return { status: 'loading', user };
    }

    if (!user) {
      if (requireAuthenticated) {
        return push('/login') as never;
      }

      return { status: 'unauthenticated', user: null };
    }

    return { status: 'authenticated', user };
  }, [user, isLoading, requireAuthenticated, push]);

  return useUserPayload;
}
