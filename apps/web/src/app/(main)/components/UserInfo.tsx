'use client';

import { ChevronDown } from 'lucide-react';

import { LoaderIcon } from '@/app/components/common/LoaderIcon';
import { UserAvatar } from '@/app/components/UserAvatar';
import { useUser } from '@/hooks/useUser';
import { Dropdown } from '@/app/components/common/Dropdown';

export function UserInfo() {
  const { status, user } = useUser(true);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button
          type="button"
          disabled={status === 'loading'}
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-primary-50 transition-colors data-[state=open]:bg-primary-300/20 hover:bg-primary-300/10 active:bg-primary-300/20 disabled:pointer-events-none sm:gap-1.5"
        >
          {status === 'authenticated' && (
            <>
              <div className="flex items-center gap-2.5">
                <UserAvatar userId={user.id} avatar={user.avatar} className="h-9 w-9 sm:h-7 sm:w-7" />

                <span className="hidden text-sm font-medium sm:inline">{user.username}</span>
              </div>

              <ChevronDown className="h-4 w-4 group-data-[state=open]:bg-red-500" />
            </>
          )}

          {status === 'loading' && <LoaderIcon className="h-5 w-5 text-primary-100" />}
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Arrow />
        <Dropdown.Item variant="danger" asChild>
          <a href="/api/auth/logout" rel="noreferrer">
            Sair
          </a>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
