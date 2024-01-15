import Conflict from '../../errors/Conflict';
import FeedbackNotExists from '../../errors/FeedbackNotExists';
import FeedbacksRepository from '../../repositories/FeedbacksRepository';

import { CloseFeedbackUseCaseDTO } from './CloseFeedbacksUseCaseDTO';

export default class CloseFeedbackUseCase {
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async execute({ feedbackId }: CloseFeedbackUseCaseDTO) {
    const feedback = await this.feedbacksRepository.findById(feedbackId);

    if (!feedback) {
      throw new FeedbackNotExists();
    }

    if (feedback.status === 'closed') {
      throw new Conflict('Feedback ja foi fechado');
    }

    await this.feedbacksRepository.update(feedbackId, { status: 'closed' });
  }
}
