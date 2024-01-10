import { SocketEventPayload } from '@tardis-enquete/contracts';

import { io } from '../../../http/app';
import Logger from '../../../infra/logger';
import PopulatePollService from '../../../services/PopulatePollService';
import Forbidden from '../../errors/Forbidden';
import PollAlreadyExpired from '../../errors/PollAlreadyExpired';
import VoteNotExists from '../../errors/VoteNotExists';
import IPollsRepository from '../../repositories/PollsRepository';
import IVotesRepository from '../../repositories/VotesRepository';

import { UnvoteDTO } from './UnvoteUseCaseDTO';

const log = Logger.start('UNVOTE USE CASE');

export default class UnvoteUseCase {
  constructor(
    private readonly votesRepository: IVotesRepository,
    private readonly pollsRepository: IPollsRepository,
    private readonly poulatePollService: PopulatePollService,
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
  }
}
