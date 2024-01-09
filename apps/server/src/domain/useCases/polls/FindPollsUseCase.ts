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

    const populate = this.populatePollService.populate.bind(this.populatePollService);

    const pollsPopuledPromises = polls.map(populate);

    const pollsPopuled = await Promise.all(pollsPopuledPromises);

    return pollsPopuled;
  }
}
