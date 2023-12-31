export interface Session {
  socketId: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  mousePosition?: { x: number; y: number };
}
