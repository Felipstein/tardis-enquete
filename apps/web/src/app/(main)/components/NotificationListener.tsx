'use client';

import { ReactNode } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSocketEvent } from '@/hooks/useSocketEvent';
import { useUser } from '@/hooks/useUser';

export type NotificationListenerProps = {
  children: ReactNode;
};

export function NotificationListener({ children }: NotificationListenerProps) {
  const router = useRouter();
  const { user } = useUser();

  const userRole = user?.role;

  useSocketEvent(
    'pushNotification',
    ({ notification }) => {
      if (!userRole) {
        return;
      }

      if (userRole === 'common' && !notification.forUsers.common) {
        return;
      }

      if (userRole === 'admin' && !notification.forUsers.admin) {
        return;
      }

      toast(notification.title, {
        description: notification.description,
        action: notification.content
          ? {
              label: notification.content.buttonLabel!,
              onClick: () => router.push(notification.content?.urlToRedirect!),
            }
          : undefined,
      });
    },
    [userRole],
  );

  return children;
}
