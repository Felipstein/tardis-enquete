import type { Session } from './Session';

export interface SocketEventsWithPayloads {
  userConnected: { session: Session };
  refreshSessions: { sessions: Session[] };
  userMouseMove: { mousePosition: { x: number; y: number } };
  userMouseLeave: void;
  userMouseClick: { userId: string; mousePosition: { x: number; y: number } };
}

export type SocketEvent = keyof SocketEventsWithPayloads;

export type SocketEventPayload<TSocketEvent extends SocketEvent> = SocketEventsWithPayloads[TSocketEvent];
