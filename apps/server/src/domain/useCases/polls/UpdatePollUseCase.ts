import { SocketEventPayload } from '@tardis-enquete/contracts';

import { io } from '../../../http/app';
import Logger from '../../../infra/logger';
import PopulatePollService from '../../../services/PopulatePollService';
import UserService from '../../../services/UserService';
import PollNotExists from '../../errors/PollNotExists';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import UnprocessableEntity from '../../errors/UnprocessableEntity';
import IOptionsRepository from '../../repositories/OptionsRepository';
import IPollsRepository from '../../repositories/PollsRepository';

import { UpdatePollUseCaseDTO, UpdatePollUseCaseReturn } from './UpdatePollUseCaseDTO';

const log = Logger.start('UPDATE POLL USE CASE');

export default class UpdatePollUseCase {
  constructor(
    private readonly pollsRepository: IPollsRepository,
    private readonly optionsRepository: IOptionsRepository,
    private readonly usersService: UserService,
    private readonly populatePollService: PopulatePollService,
  ) {}

  async execute({ id, options: optionsToUpdate, ...data }: UpdatePollUseCaseDTO): Promise<UpdatePollUseCaseReturn> {
    if (data.expireAt) {
      if (data.expireAt <= new Date()) {
        throw new UnprocessableEntity('A data de expiração deve ser posterior a data de criação');
      }
    }

    const pollExists = await this.pollsRepository.exists(id);
    if (!pollExists) {
      throw new PollNotExists();
    }

    if (optionsToUpdate) {
      await Promise.all([
        this.optionsRepository.deleteOptionsOfPoll(id),
        this.optionsRepository.createMany(id, optionsToUpdate),
      ]);
    }

    const { poll, options } = await this.pollsRepository.update(id, data);

    const [authorInfo, totalPolls] = await Promise.all([
      this._findUserInfo(poll.authorId),
      this.pollsRepository.countTotalPollsOfUserId(poll.authorId),
    ]);

    if (process.env.NODE_ENV !== 'test') {
      const pollUpdated = await this.pollsRepository.findByIdWithOptionsAndVotes(poll.id);

      if (pollUpdated) {
        const pollPopuled = await this.populatePollService.populate(pollUpdated);

        log.verbose.info('Emitting socket event (poll updated), poll info:', JSON.stringify(pollPopuled, null, 2));

        io.emit('pollVotesChanges', { poll: pollPopuled } as SocketEventPayload<'pollVotesChanges'>);
      } else {
        log.warn('Poll not found to emit socket event, original poll info:', JSON.stringify(poll, null, 2));
      }
    }

    return {
      id: poll.id,
      title: poll.title,
      description: poll.description,
      expireAt: poll.expireAt,
      createdAt: poll.createdAt,
      categoryId: poll.categoryId,
      options,
      author: {
        id: authorInfo.id,
        username: authorInfo.username,
        globalName: authorInfo.globalName,
        avatar: authorInfo.avatar,
        totalPolls,
      },
    };
  }

  private async _findUserInfo(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new StoredUserNotExists(`Não há informações do usuário ${userId} cadastradas ainda`);
    }

    return user;
  }
}
