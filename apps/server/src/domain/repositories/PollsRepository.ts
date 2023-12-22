import Poll from '../entities/Poll';

import { CreatePollDTO, PollWithOptionsAndVotes, UpdatePollDTO } from './PollsRepositoryDTO';

export default interface IPollsRepository {
  exists(id: string): Promise<boolean>;

  findAllWithOptionsAndVotes(): Promise<PollWithOptionsAndVotes[]>;

  countTotalPollsOfUserId(userId: string): Promise<number>;

  create(data: CreatePollDTO): Promise<Poll>;

  update(id: string, data: UpdatePollDTO): Promise<Poll>;

  updateByInstance(data: Poll): Promise<void>;

  delete(id: string): Promise<void>;
}
