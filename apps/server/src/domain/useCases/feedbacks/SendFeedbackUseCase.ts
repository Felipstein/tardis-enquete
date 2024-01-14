import FeedbacksRepository from '../../repositories/FeedbacksRepository';

import { SendFeedbackUseCaseDTO, SendFeedbackUseCaseReturn } from './SendFeedbackUseCaseDTO';

export default class SendFeedbackUseCase {
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async execute(data: SendFeedbackUseCaseDTO): Promise<SendFeedbackUseCaseReturn> {
    const feedback = await this.feedbacksRepository.create(data);

    return feedback.id;
  }
}
