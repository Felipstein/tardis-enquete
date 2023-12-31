'use client';

import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { getServerURL } from '@/utils/getServerURL';

export type SocketContextProps =
  | {
      status: 'connected';
      socket: Socket;
    }
  | {
      status: 'connecting' | 'disconnected';
      socket: Socket | null;
    };

export const SocketContext = createContext({} as SocketContextProps);

export type SocketProviderProps = {
  children: ReactNode;
};

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

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
    } as SocketContextProps;
  }, [socket, isConnecting]);

  useEffect(() => {
    setIsConnecting(true);

    const socketInstance = io(getServerURL());

    socketInstance.on('connect', () => {
      console.info('User connected', socketInstance.id);

      setSocket(socketInstance);
      setIsConnecting(false);
    });

    socketInstance.on('disconnect', () => {
      console.info('User disconnected', socketInstance.id);

      setSocket(null);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={context}>{children}</SocketContext.Provider>;
}
