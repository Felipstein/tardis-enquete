import Image from 'next/image';
import { ComponentProps } from 'react';

import { OmitTyped } from '@/utils/OmitTyped';
import { w } from '@/utils/w';

export type UserAvatarProps = OmitTyped<ComponentProps<typeof Image>, 'alt' | 'src'> & {
  userId: string;
  avatar: string;
};

export function UserAvatar({ userId, avatar, width = 32, height = 32, className, ...props }: UserAvatarProps) {
  const url = `https://cdn.discordapp.com/avatars/${userId}/${avatar}`;

  return (
    <Image
      src={url}
      alt={`User ${userId} avatar`}
      width={width}
      height={height}
      className={w('rounded-full', className)}
      {...props}
    />
  );
}
