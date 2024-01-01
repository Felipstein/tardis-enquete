'use client';

import { useSocket } from '@/hooks/useSocket';
import { useUser } from '@/hooks/useUser';

export function RenderMousePositions() {
  const { user: authUser } = useUser();
  const { sessions, status } = useSocket();

  if (status !== 'connected') {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {sessions
        .filter((session) => session.mousePosition && session.user.id !== authUser?.id)
        .map((session) => (
          <div
            className="pointer-events-none relative"
            style={{ top: session.mousePosition!.y, left: session.mousePosition!.x }}
          >
            <p>{session.user.username}</p>
          </div>
        ))}
    </div>
  );
}
