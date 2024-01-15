import FeedbackNotExists from '../../errors/FeedbackNotExists';
import FeedbacksRepository from '../../repositories/FeedbacksRepository';

import { DeleteFeedbackUseCaseDTO } from './DeleteFeedbacksUseCaseDTO';

export default class DeleteFeedbackUseCase {
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async execute({ feedbackId }: DeleteFeedbackUseCaseDTO) {
    const feedback = await this.feedbacksRepository.findById(feedbackId);

    if (!feedback) {
      throw new FeedbackNotExists();
    }

    await this.feedbacksRepository.delete(feedbackId);
  }
}
