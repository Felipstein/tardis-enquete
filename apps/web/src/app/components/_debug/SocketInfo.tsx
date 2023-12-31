'use client';

import { SocketContextProps } from '@/contexts/SocketContext';
import { useSocket } from '@/hooks/useSocket';
import { w } from '@/utils/w';

const socketInfo: Record<SocketContextProps['status'], { color: string; label: string }> = {
  connecting: { color: 'bg-amber-500', label: 'Connecting...' },
  connected: { color: 'bg-green-500', label: 'Connected' },
  disconnected: { color: 'bg-red-500', label: 'Disconnected' },
};

export function SocketInfo() {
  const { status, socket } = useSocket();

  return (
    <div className="absolute bottom-6 left-6 z-40 flex items-center gap-3 rounded-md border-gray-700 bg-black/80 px-4 py-2.5 backdrop-blur-sm">
      <div className={w('h-2.5 w-2.5 rounded-full', socketInfo[status].color)} />

      <div className="flex flex-col">
        <span className="text-xs text-primary-50">{socketInfo[status].label}</span>

        {status === 'connected' && <span className="text-[10px] text-primary-300">{socket.id}</span>}
      </div>
    </div>
  );
}
