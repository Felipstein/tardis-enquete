export interface Category {
  id: string;
  name: string;
  description: string | null;
  author: {
    id: string;
    username: string;
    globalName: string;
    avatar: string;
    totalPolls: number;
  };
  totalPolls: number;
  createdAt: Date;
}
