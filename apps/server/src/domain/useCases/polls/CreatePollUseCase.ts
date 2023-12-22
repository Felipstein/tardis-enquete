import StoredUserNotExists from '../../errors/StoredUserNotExists';
import UnprocessableEntity from '../../errors/UnprocessableEntity';
import IPollsRepository from '../../repositories/PollsRepository';
import IStoredUsersRepository from '../../repositories/StoredUsersStoredRepository';

import { CreatePollUseCaseDTO } from './CreatePollUseCaseDTO';

export default class CreatePollUseCase {
  constructor(
    private readonly pollsRepository: IPollsRepository,
    private readonly storedUsersRepository: IStoredUsersRepository,
  ) {}

  async execute(data: CreatePollUseCaseDTO) {
    if (data.expireAt <= new Date()) {
      throw new UnprocessableEntity('A data de expiração deve ser posterior a data de criação');
    }

    const storedUsersExists = await this.storedUsersRepository.exists(data.authorId);

    if (!storedUsersExists) {
      throw new StoredUserNotExists(`Não há informações do usuário ${data.authorId} cadastradas ainda`);
    }

    const poll = await this.pollsRepository.create(data);

    return poll;
  }
}
