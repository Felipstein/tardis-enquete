import UserService from '../../../services/UserService';
import PollNotExists from '../../errors/PollNotExists';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import IPollsRepository from '../../repositories/PollsRepository';

import { FindPollByIdUseCaseInput, FindPollByIdUseCaseReturn } from './FindPollByIdUseCaseDTO';

export default class FindPollByIdUseCase {
  constructor(
    private readonly pollsRepository: IPollsRepository,
    private readonly usersService: UserService,
  ) {}

  async execute({ pollId }: FindPollByIdUseCaseInput): Promise<FindPollByIdUseCaseReturn> {
    const pollWithOptions = await this.pollsRepository.findByIdWithOptions(pollId);

    if (!pollWithOptions) {
      throw new PollNotExists();
    }

    const { poll, options } = pollWithOptions;

    const [authorInfo, totalPolls] = await Promise.all([
      this._findUserInfo(poll.authorId),
      this.pollsRepository.countTotalPollsOfUserId(poll.authorId),
    ]);

    return {
      id: poll.id,
      title: poll.title,
      description: poll.description,
      expireAt: poll.expireAt,
      createdAt: poll.createdAt,
      categoryId: poll.categoryId,
      closed: poll.closed,
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
