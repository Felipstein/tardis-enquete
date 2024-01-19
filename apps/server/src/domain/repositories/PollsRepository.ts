import Poll from '../entities/Poll';

import { CreatePollDTO, PollWithOptions, PollWithOptionsAndVotes, UpdatePollDTO } from './PollsRepositoryDTO';

export default interface IPollsRepository {
  exists(id: string): Promise<boolean>;

  findAllWithOptionsAndVotes(): Promise<PollWithOptionsAndVotes[]>;

  findByIdWithOptionsAndVotes(id: string): Promise<PollWithOptionsAndVotes | null>;

  findByIdWithOptions(id: string): Promise<PollWithOptions | null>;

  findPollThatContainsOption(optionId: string): Promise<Poll | null>;

  countTotalPollsOfUserId(userId: string): Promise<number>;

  countTotalPollsOfCategoryId(categoryId: string): Promise<number>;

  countTotalPollsWithoutCategory(): Promise<number>;

  create(data: CreatePollDTO): Promise<PollWithOptions>;

  update(id: string, data: UpdatePollDTO): Promise<PollWithOptions>;

  updateByInstance(data: Poll): Promise<void>;

  delete(id: string): Promise<void>;
}
