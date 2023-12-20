import { OmitTyped } from '../../utils/OmitTyped';
import { EntityProps } from '../entities/core/Entity';
import Poll from '../entities/Poll';

export interface CreatePollDTO {
  title: string;
  description: string;
  expireAt: Date;
  authorId: string;
}

export type UpdatePollDTO = Partial<OmitTyped<EntityProps<Poll>, 'id' | 'createdAt' | 'authorId'>>;

export interface PollWithOptionsAndVotes {
  poll: Poll;
  options: Array<{
    id: string;
    text: string;
    votes: Array<{
      id: string;
      userId: string;
    }>;
  }>;
}
