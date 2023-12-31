import { Server } from 'socket.io';

export function setupSockets(io: Server) {
  io.on('connection', (socket) => {
    console.info(socket.id, 'user connected');

    socket.on('disconnect', () => {
      console.info(socket.id, 'user disconnected');
    });
  });
}
