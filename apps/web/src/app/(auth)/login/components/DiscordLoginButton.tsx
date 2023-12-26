/* eslint-disable next-recommended/unnecessarily-client-declaration */

'use client';

import { Button } from '@/app/components/common/Button';
import { Discord } from '@/app/components/icons/Discord';
import { w } from '@/utils/w';

export type DiscordLoginButtonProps = {
  className?: string;
};

export function DiscordLoginButton({ className }: DiscordLoginButtonProps) {
  return (
    <Button icon={Discord} className={w('w-full', className)}>
      <a href="/api/auth/login" rel="noreferrer">
        Login com Discord
      </a>
    </Button>
  );
}
