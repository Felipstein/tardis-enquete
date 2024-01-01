'use client';

import { SocketEventPayload } from '@tardis-enquete/contracts';
import { MousePointer2, MousePointerClick } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useSocket } from '@/hooks/useSocket';
import { useUser } from '@/hooks/useUser';

export function RenderMousePositions() {
  const { user: authUser } = useUser();
  const { sessions, status, socket } = useSocket();

  // eslint-disable-next-line no-undef
  const [clicks, setClicks] = useState<Array<{ userId: string; timer: NodeJS.Timeout }>>([]);

  useEffect(() => {
    socket?.on('userMouseClick', ({ userId }: SocketEventPayload<'userMouseClick'>) => {
      if (userId === authUser?.id) {
        return;
      }

      const userClick = clicks.find((click) => click.userId === userId);

      if (userClick) {
        clearTimeout(userClick.timer);

        setClicks((state) => state.filter((click) => click.userId !== userId));
      }

      const timer = setTimeout(() => {
        setClicks((state) => state.filter((click) => click.userId !== userId));
      }, 500);

      setClicks((state) => [...state, { userId, timer }]);
    });

    return () => {
      clicks.forEach((click) => clearTimeout(click.timer));
    };
  }, [clicks, socket]);

  if (status !== 'connected') {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {sessions
        .filter((session) => session.mousePosition)
        .filter((session) => session.user.id !== authUser?.id)
        .map((session) => {
          const userClicked = clicks.some((click) => click.userId === session.user.id);

          return (
            <div
              className="pointer-events-none relative inline-block text-primary-100/60"
              style={{ top: session.mousePosition!.y, left: session.mousePosition!.x }}
            >
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px]">{session.user.username}</span>

              {userClicked ? <MousePointerClick className="h-4 w-4" /> : <MousePointer2 className="h-4 w-4" />}
            </div>
          );
        })}
    </div>
  );
}
