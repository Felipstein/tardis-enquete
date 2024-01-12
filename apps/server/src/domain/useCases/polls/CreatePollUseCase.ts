import UserService from '../../../services/UserService';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import UnprocessableEntity from '../../errors/UnprocessableEntity';
import IPollsRepository from '../../repositories/PollsRepository';
import IStoredUsersRepository from '../../repositories/StoredUsersStoredRepository';

import { CreatePollUseCaseDTO, CreatePollUseCaseReturn } from './CreatePollUseCaseDTO';

export default class CreatePollUseCase {
  constructor(
    private readonly pollsRepository: IPollsRepository,
    private readonly storedUsersRepository: IStoredUsersRepository,
    private readonly usersService: UserService,
  ) {}

  async execute(data: CreatePollUseCaseDTO): Promise<CreatePollUseCaseReturn> {
    if (data.expireAt <= new Date()) {
      throw new UnprocessableEntity('A data de expiração deve ser posterior a data de criação');
    }

    const storedUsersExists = await this.storedUsersRepository.exists(data.authorId);

    if (!storedUsersExists) {
      throw new StoredUserNotExists(`Não há informações do usuário ${data.authorId} cadastradas ainda`);
    }

    const { poll, options } = await this.pollsRepository.create(data);

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
