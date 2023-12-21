import BadRequest from '../../errors/BadRequest';
import IPollsRepository from '../../repositories/PollsRepository';

import { CreatePollUseCaseDTO } from './CreatePollUseCaseDTO';

export default class CreatePollUseCase {
  constructor(private readonly pollsRepository: IPollsRepository) {}

  async execute(data: CreatePollUseCaseDTO) {
    if (data.expireAt <= new Date()) {
      throw new BadRequest('A data de expiração deve ser posterior a data de criação');
    }

    const poll = await this.pollsRepository.create(data);

    return poll;
  }
}
