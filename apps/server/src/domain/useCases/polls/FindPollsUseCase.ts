import PopulatePollService from '../../../services/PopulatePollService';
import IPollsRepository from '../../repositories/PollsRepository';

import { FindPollsUseCaseReturn } from './FindPollsUseCaseDTO';

export default class FindPollsUseCase {
  constructor(
    private readonly pollsRepository: IPollsRepository,
    private readonly populatePollService: PopulatePollService,
  ) {}

  async execute(): Promise<FindPollsUseCaseReturn> {
    const polls = await this.pollsRepository.findAllWithOptionsAndVotes();

    const pollsPopuledPromises = polls.map(this.populatePollService.populate);

    const pollsPopuled = await Promise.all(pollsPopuledPromises);

    return pollsPopuled;
  }
}
