'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';

import { LoaderIcon } from '@/app/components/common/LoaderIcon';
import { UserAvatar } from '@/app/components/UserAvatar';
import { useUser } from '@/hooks/useUser';

export function UserInfo() {
  const { status, user } = useUser(true);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
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
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-40 min-w-40 rounded-md bg-gradient-to-br from-black/50 to-gray-900/60 p-2 shadow-md backdrop-blur-sm"
          sideOffset={5}
        >
          <DropdownMenu.Arrow className="fill-black/50" />

          {/* <DropdownMenu.Item
            className="flex w-full items-center rounded px-3 py-1.5 text-sm font-normal leading-none text-primary-50 transition-colors hover:bg-primary-500/10 active:bg-primary-500/20"
            asChild
          >
            <button type="button">
              Sair
            </button>
          </DropdownMenu.Item> */}
          <DropdownMenu.Item
            className="flex w-full items-center rounded px-3 py-1.5 text-sm font-normal leading-none text-red-400 transition-colors hover:bg-red-400/10 active:bg-red-400/20"
            asChild
          >
            <a href="/api/logout" rel="noreferrer">
              Sair
            </a>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
