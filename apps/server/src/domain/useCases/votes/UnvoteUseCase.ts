import Forbidden from '../../errors/Forbidden';
import PollAlreadyExpired from '../../errors/PollAlreadyExpired';
import VoteNotExists from '../../errors/VoteNotExists';
import IPollsRepository from '../../repositories/PollsRepository';
import IVotesRepository from '../../repositories/VotesRepository';

import { UnvoteDTO } from './UnvoteUseCaseDTO';

export default class UnvoteUseCase {
  constructor(
    private readonly votesRepository: IVotesRepository,
    private readonly pollsRepository: IPollsRepository,
  ) {}

  async execute({ userId, voteId, onlySameUserCanUnvote }: UnvoteDTO) {
    const vote = await this.votesRepository.findById(voteId);

    if (!vote) {
      throw new VoteNotExists();
    }

    const poll = await this.pollsRepository.findPollThatContainsOption(vote.optionId);

    if (!poll) {
      throw new VoteNotExists();
    }

    if (poll.isExpired()) {
      throw new PollAlreadyExpired();
    }

    if (onlySameUserCanUnvote) {
      const byUserId = vote.userId;

      if (userId !== byUserId) {
        throw new Forbidden('Você não pode remover voto de outra pessoa');
      }
    }

    await this.votesRepository.delete(voteId);
  }
}
