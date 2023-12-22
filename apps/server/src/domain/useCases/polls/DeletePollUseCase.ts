import PollNotExists from '../../errors/PollNotExists';
import IPollsRepository from '../../repositories/PollsRepository';

import { DeletePollUseCaseDTO } from './DeletePollUseCaseDTO';

export default class DeletePollUseCase {
  constructor(private readonly pollsRepository: IPollsRepository) {}

  async execute({ pollId }: DeletePollUseCaseDTO) {
    const pollExists = await this.pollsRepository.exists(pollId);

    if (!pollExists) {
      throw new PollNotExists();
    }

    await this.pollsRepository.delete(pollId);
  }
}
