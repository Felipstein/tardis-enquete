'use client';

import { SocketEventPayload } from '@tardis-enquete/contracts';
import { ReactNode, useEffect } from 'react';

import { useSocket } from '@/hooks/useSocket';
import { useUser } from '@/hooks/useUser';

export type TrackMousePositionProps = {
  children: ReactNode;
};

export function TrackMousePosition({ children }: TrackMousePositionProps) {
  const { user } = useUser();
  const { socket } = useSocket();

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      socket?.emit('userMouseMove', {
        mousePosition: { x: event.clientX, y: event.clientY },
      } as SocketEventPayload<'userMouseMove'>);
    }

    function handleMouseClick(event: MouseEvent) {
      if (!user) {
        return;
      }

      socket?.emit('userMouseClick', {
        userId: user.id,
        mousePosition: { x: event.clientX, y: event.clientY },
      } as SocketEventPayload<'userMouseClick'>);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseClick);
    };
  }, [user, socket]);

  function handleMouseLeave() {
    socket?.emit('userMouseLeave');
  }

  return (
    <div className="h-full w-full" onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
}
