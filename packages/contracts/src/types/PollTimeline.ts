export interface PollTimeline {
  id: string;
  title: string;
  description: string;
  expireAt: Date;
  createdAt: Date;
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
    votes: Array<{
      id: string;
      user: {
        id: string;
        username: string;
        globlaName: string;
        avatar: string;
      };
    }>;
  }>;
}
