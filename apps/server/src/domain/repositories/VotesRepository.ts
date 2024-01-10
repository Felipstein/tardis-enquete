import Vote from '../entities/Vote';

import { CreateVoteDTO } from './VotesRepositoryDTO';

export default interface IVotesRepository {
  existsByUserAndOption(userId: string, optionId: string): Promise<boolean>;

  findById(id: string): Promise<Vote | null>;

  findAllVotesOfOptionId(optionId: string): Promise<Vote[]>;

  create(data: CreateVoteDTO): Promise<Vote>;

  delete(id: string): Promise<void>;
}
