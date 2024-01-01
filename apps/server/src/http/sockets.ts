import { Session, SocketEventPayload } from '@tardis-enquete/contracts';
import { Server } from 'socket.io';

export function setupSockets(io: Server) {
  let sessions: Session[] = [];

  io.on('connection', (socket) => {
    console.info(socket.id, 'Initial connection detected.');

    socket.on('userConnected', ({ session }: SocketEventPayload<'userConnected'>) => {
      console.info(session.socketId, `User session initialized (${session.user.username}/${session.user.id})`);

      if (sessions.some((s) => s.user.id === session.user.id)) {
        sessions = sessions.filter((s) => s.user.id !== session.user.id);
      }

      sessions.push(session);

      io.emit('refreshSessions', { sessions } as SocketEventPayload<'refreshSessions'>);

      socket.on('userMouseMove', ({ mousePosition }: SocketEventPayload<'userMouseMove'>) => {
        sessions = sessions.map((s) => {
          if (s.socketId === session.socketId) {
            return {
              ...s,
              mousePosition,
            };
          }

          return s;
        });

        io.emit('refreshSessions', { sessions } as SocketEventPayload<'refreshSessions'>);
      });

      socket.on('userMouseLeave', () => {
        sessions = sessions.map((s) => {
          if (s.socketId === session.socketId) {
            return {
              ...s,
              mousePosition: undefined,
            };
          }

          return s;
        });

        io.emit('refreshSessions', { sessions } as SocketEventPayload<'refreshSessions'>);
      });

      socket.on('userMouseClick', ({ userId, mousePosition }: SocketEventPayload<'userMouseClick'>) => {
        io.emit('userMouseClick', { userId, mousePosition } as SocketEventPayload<'userMouseClick'>);
      });

      socket.on('disconnect', () => {
        console.info(socket.id, 'user disconnected');

        sessions = sessions.filter((s) => s.user.id !== session.user.id);

        io.emit('refreshSessions', { sessions } as SocketEventPayload<'refreshSessions'>);
      });
    });
  });
}
