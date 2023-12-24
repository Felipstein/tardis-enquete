import Conflict from '../../errors/Conflict';
import PollAlreadyExpired from '../../errors/PollAlreadyExpired';
import PollNotExists from '../../errors/PollNotExists';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import IOptionsRepository from '../../repositories/OptionsRepository';
import IPollsRepository from '../../repositories/PollsRepository';
import IStoredUsersRepository from '../../repositories/StoredUsersStoredRepository';
import IVotesRepository from '../../repositories/VotesRepository';

import { VoteDTO } from './VoteUseCaseDTO';

export default class VoteUseCase {
  constructor(
    private readonly votesRepository: IVotesRepository,
    private readonly optionsRepository: IOptionsRepository,
    private readonly pollsRepository: IPollsRepository,
    private readonly storedUsersRepository: IStoredUsersRepository,
  ) {}

  async execute({ userId, optionId }: VoteDTO) {
    const poll = await this.pollsRepository.findPollThatContainsOption(optionId);

    if (!poll) {
      throw new PollNotExists('Não há nenhuma enquete que possui a opção providenciada');
    }

    if (poll.isExpired()) {
      throw new PollAlreadyExpired();
    }

    const userExists = await this.storedUsersRepository.exists(userId);
    if (!userExists) {
      throw new StoredUserNotExists('Usuário não encontrado');
    }

    const voteExists = await this.votesRepository.existsByUserAndOption(userId, optionId);
    if (voteExists) {
      throw new Conflict('Você já votou nessa opção');
    }

    /**
     * Verifica se o usuário já tem algum voto em alguma opção da mesma enquete e, caso tenha, remova-o.
     */
    const optionVotedInPoll = await this.optionsRepository.findOptionVotedByUserInPoll(userId, poll.id);
    if (optionVotedInPoll) {
      const optionVote = await this.votesRepository.findByOptionId(optionVotedInPoll.id);

      if (optionVote) {
        await this.votesRepository.delete(optionVote?.id);
      }
    }

    const vote = await this.votesRepository.create({ userId, optionId });

    return vote;
  }
}
