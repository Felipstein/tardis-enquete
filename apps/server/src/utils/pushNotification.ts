import { Notification, SocketEventPayload } from '@tardis-enquete/contracts';

import { io as defaultIO } from '../http/app';

export function pushNotification(notification: Notification, io = defaultIO) {
  io.emit('pushNotification', { notification } as SocketEventPayload<'pushNotification'>);
}
