'use client';

import { SocketEventPayload } from '@tardis-enquete/contracts';
import { ReactNode, useEffect } from 'react';

import { useSocket } from '@/hooks/useSocket';

export type TrackMousePositionProps = {
  children: ReactNode;
};

export function TrackMousePosition({ children }: TrackMousePositionProps) {
  const { socket } = useSocket();

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      socket?.emit('userMouseMove', {
        mousePosition: { x: event.clientX, y: event.clientY },
      } as SocketEventPayload<'userMouseMove'>);
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [socket]);

  function handleMouseLeave() {
    socket?.emit('userMouseLeave');
  }

  return (
    <div className="h-full w-full" onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
}
