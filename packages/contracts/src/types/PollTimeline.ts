import { Category } from './Category';
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

export type PollTimeline = Omit<Poll, 'options' | 'categoryId'> & {
  category: Pick<Category, 'id' | 'name'> | null;
  options: OptionWithVotes[];
};
