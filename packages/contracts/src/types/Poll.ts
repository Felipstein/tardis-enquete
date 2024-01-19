export interface Poll {
  id: string;
  title: string;
  description: string | null;
  expireAt: Date;
  createdAt: Date;
  categoryId: string | null;
  author: {
    id: string;
    username: string;
    globalName: string;
    avatar: string;
    totalPolls: number;
  };
  options: Array<{
    id: string;
    text: string;
    totalVotes: number;
  }>;
}
