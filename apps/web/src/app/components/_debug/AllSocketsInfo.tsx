'use client';

import { UserAvatar } from '../UserAvatar';

import { DebugContainer } from './DebugContainer';

import { useSocket } from '@/hooks/useSocket';
import { useUser } from '@/hooks/useUser';

export function AllSocketsInfo() {
  const { user: authUser } = useUser();

  const { status, sessions } = useSocket();

  if (status !== 'connected') {
    return null;
  }

  const isPlural = sessions.length !== 1;

  return (
    <DebugContainer className="space-y-3.5">
      <p className="text-xs text-primary-500">
        {sessions.length} sess{isPlural ? 'ões' : 'ão'} conectada{isPlural ? 's' : ''}
      </p>
      <ul className="space-y-3">
        {sessions.map((session) => {
          const isMe = session.user.id === authUser?.id;

          return (
            <li key={session.socketId}>
              <div className="flex items-center gap-3">
                <UserAvatar userId={session.user.id} avatar={session.user.avatar} width={28} height={28} />

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <span
                      data-me={isMe}
                      className="text-xs text-primary-50 data-[me=true]:font-semibold data-[me=true]:text-sky-400"
                    >
                      {isMe ? 'VOCÊ' : session.user.username}
                    </span>
                    <span className="text-[8px] italic text-primary-100/80">{session.user.id}</span>
                  </div>

                  <span className="text-[10px] text-primary-300">{session.socketId}</span>
                </div>

                {session.mousePosition && (
                  <pre className="font-mono text-xs text-primary-300">{JSON.stringify(session.mousePosition)}</pre>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </DebugContainer>
  );
}
