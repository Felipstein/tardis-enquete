'use client';

import { DebugContainer } from './DebugContainer';

import { SocketContextProps } from '@/contexts/SocketContext';
import { useSocket } from '@/hooks/useSocket';
import { w } from '@/utils/w';

const socketInfo: Record<SocketContextProps['status'], { color: string; label: string }> = {
  connecting: { color: 'bg-amber-500', label: 'Conectando...' },
  connected: { color: 'bg-green-500', label: 'Conectado' },
  disconnected: { color: 'bg-red-500', label: 'Desconectado' },
};

export function SocketInfo() {
  const { status, socket } = useSocket();

  return (
    <DebugContainer className="flex items-center gap-3">
      <div className={w('h-2.5 w-2.5 rounded-full', socketInfo[status].color)} />

      <div className="flex flex-col">
        <span className="text-xs text-primary-50">{socketInfo[status].label}</span>

        {status === 'connected' && <span className="text-[10px] text-primary-300">{socket.id}</span>}
      </div>
    </DebugContainer>
  );
}
