import { Poll } from './Poll';

type Option = Poll['options'][number];

type OptionWithVotes = Omit<Option, 'totalVotes'> & {
  votes: Array<{
    id: string;
    user: {
      id: string;
      username: string;
      globalName: string;
      avatar: string;
    };
  }>;
};

export type PollTimeline = Omit<Poll, 'options'> & {
  options: OptionWithVotes[];
};
