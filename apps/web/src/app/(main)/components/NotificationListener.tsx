'use client';

import { ReactNode } from 'react';
import { toast } from 'react-toastify';
import { useSocketEvent } from '@/hooks/useSocketEvent';
import { useUser } from '@/hooks/useUser';

export type NotificationListenerProps = {
  children: ReactNode;
};

export function NotificationListener({ children }: NotificationListenerProps) {
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

      toast.info(notification.title);
    },
    [userRole],
  );

  return children;
}
