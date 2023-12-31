'use client';

import { Session, SocketEventPayload } from '@tardis-enquete/contracts';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { useUser } from '@/hooks/useUser';
import { getServerURL } from '@/utils/getServerURL';

export type SocketContextProps =
  | {
      status: 'connected';
      socket: Socket;
      sessions: Session[];
    }
  | {
      status: 'connecting' | 'disconnected';
      socket: Socket | null;
      sessions?: Session[];
    };

export const SocketContext = createContext({} as SocketContextProps);

export type SocketProviderProps = {
  children: ReactNode;
};

export function SocketProvider({ children }: SocketProviderProps) {
  const { user, status } = useUser();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const [sessions, setSessions] = useState<Session[]>([]);

  const context = useMemo<SocketContextProps>(() => {
    let status: SocketContextProps['status'];

    if (isConnecting) {
      status = 'connecting';
    } else {
      status = socket ? 'connected' : 'disconnected';
    }

    return {
      status,
      socket,
      sessions,
    } as SocketContextProps;
  }, [socket, isConnecting, sessions]);

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }

    setIsConnecting(true);

    const socketInstance = io(getServerURL());

    socketInstance.on('connect', () => {
      setSocket(socketInstance);
      setIsConnecting(false);

      socketInstance.emit('userConnected', {
        session: { socketId: socketInstance.id, user: { id: user.id, avatar: user.avatar, username: user.username } },
      } as SocketEventPayload<'userConnected'>);
    });

    socketInstance.on('disconnect', () => {
      setSocket(null);
    });

    socketInstance.on('refreshSessions', ({ sessions }: SocketEventPayload<'refreshSessions'>) => {
      setSessions(sessions);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      socketInstance.disconnect();
    };
  }, [status, user]);

  return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>;
}
