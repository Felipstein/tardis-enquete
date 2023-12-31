'use client';

import { useSocket } from '@/hooks/useSocket';

export function RenderMousePositions() {
  const { sessions, status } = useSocket();

  if (status !== 'connected') {
    return null;
  }

  return (
    <div className="z-60 pointer-events-none absolute inset-0 overflow-hidden">
      {sessions
        .filter((session) => session.mousePosition)
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
