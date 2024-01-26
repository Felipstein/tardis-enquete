import { pushNotification } from '../../../utils/pushNotification';
import FeedbacksRepository from '../../repositories/FeedbacksRepository';

import { SendFeedbackUseCaseDTO, SendFeedbackUseCaseReturn } from './SendFeedbackUseCaseDTO';

export default class SendFeedbackUseCase {
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async execute(data: SendFeedbackUseCaseDTO): Promise<SendFeedbackUseCaseReturn> {
    const feedback = await this.feedbacksRepository.create(data);

    if (process.env.NODE_ENV !== 'test') {
      pushNotification({ title: 'Novo feedback recebido', forUsers: { common: false, admin: false, developer: true } });
    }

    return feedback.id;
  }
}
