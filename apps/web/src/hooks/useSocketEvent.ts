'use client';

import { DependencyList, useEffect } from 'react';
import { SocketEvent, SocketEventPayload } from '@tardis-enquete/contracts';
import { useSocket } from './useSocket';

export function useSocketEvent<TSocketEvent extends SocketEvent>(
  event: TSocketEvent,
  callback: (data: SocketEventPayload<TSocketEvent>) => void,
  deps: DependencyList = [],
) {
  const socketInstance = useSocket();

  if (!socketInstance) {
    throw new Error('useSocketEvent must be used within a SocketProvider');
  }

  const { socket } = socketInstance;

  useEffect(() => {
    // @ts-expect-error
    socket?.on(event, callback);

    return () => {
      // @ts-expect-error
      socket?.removeListener(event, callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, ...deps]);
}
