import { SocketEventPayload } from '@tardis-enquete/contracts';

import { io } from '../../../http/app';
import Logger from '../../../infra/logger';
import PopulatePollService from '../../../services/PopulatePollService';
import Conflict from '../../errors/Conflict';
import PollAlreadyExpired from '../../errors/PollAlreadyExpired';
import PollNotExists from '../../errors/PollNotExists';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import IOptionsRepository from '../../repositories/OptionsRepository';
import IPollsRepository from '../../repositories/PollsRepository';
import IStoredUsersRepository from '../../repositories/StoredUsersStoredRepository';
import IVotesRepository from '../../repositories/VotesRepository';

import { VoteDTO } from './VoteUseCaseDTO';

const log = Logger.start('VOTE USE CASE');

export default class VoteUseCase {
  constructor(
    private readonly votesRepository: IVotesRepository,
    private readonly optionsRepository: IOptionsRepository,
    private readonly pollsRepository: IPollsRepository,
    private readonly storedUsersRepository: IStoredUsersRepository,
    private readonly poulatePollService: PopulatePollService,
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
      const optionVotes = await this.votesRepository.findAllVotesOfOptionId(optionVotedInPoll.id);

      const optionVotedByUser = optionVotes.find((option) => option.userId === userId);

      if (optionVotedByUser) {
        await this.votesRepository.delete(optionVotedByUser.id);
      }
    }

    const vote = await this.votesRepository.create({ userId, optionId });

    if (process.env.NODE_ENV !== 'test') {
      const pollUpdated = await this.pollsRepository.findByIdWithOptionsAndVotes(poll.id);

      if (pollUpdated) {
        const pollPopuled = await this.poulatePollService.populate(pollUpdated);

        log.verbose.info('Emitting socket event (poll updated), poll info:', JSON.stringify(pollPopuled, null, 2));

        io.emit('pollVotesChanges', { poll: pollPopuled } as SocketEventPayload<'pollVotesChanges'>);
      } else {
        log.warn('Poll not found to emit socket event, original poll info:', JSON.stringify(poll, null, 2));
      }
    }

    return vote;
  }
}
