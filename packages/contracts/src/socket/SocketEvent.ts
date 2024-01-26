import { CategorySelectInfo, PollTimeline } from '../types';
import { Notification } from '../types/Notification';

import type { Session } from './Session';

export interface SocketEventsWithPayloads {
  userConnected: { session: Session };
  refreshSessions: { sessions: Session[] };
  userMouseMove: { mousePosition: { x: number; y: number } };
  userMouseLeave: void;
  userMouseClick: { userId: string; mousePosition: { x: number; y: number } };
  pollCreate: { poll: PollTimeline };
  pollVotesChanges: { poll: PollTimeline };
  pollDelete: { pollId: string };
  updateCategoriesSelect: { categories: CategorySelectInfo[] };
  pushNotification: { notification: Notification };
}

export type SocketEvent = keyof SocketEventsWithPayloads;

export type SocketEventPayload<TSocketEvent extends SocketEvent> = SocketEventsWithPayloads[TSocketEvent];
