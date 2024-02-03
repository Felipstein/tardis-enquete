import { OmitTyped } from '../../utils/OmitTyped';
import { EntityProps } from '../entities/core/Entity';
import Poll from '../entities/Poll';

export interface CreatePollDTO {
  title: string;
  description?: string;
  expireAt?: Date;
  authorId: string;
  categoryId?: string;
  options: Array<{ position: number; text: string }>;
}

export type UpdatePollDTO = Partial<
  OmitTyped<EntityProps<Poll>, 'id' | 'createdAt' | 'expireAt' | 'authorId' | 'description' | 'categoryId'> & {
    description?: string | null;
    expireAt?: Date | null;
    categoryId?: string | null;
  }
>;

export interface PollWithOptions {
  poll: Poll;
  options: Array<{
    id: string;
    text: string;
    position: number;
    totalVotes: number;
  }>;
}

export interface PollWithOptionsAndVotes {
  poll: Poll;
  options: Array<{
    id: string;
    text: string;
    position: number;
    votes: Array<{
      id: string;
      userId: string;
    }>;
  }>;
}
