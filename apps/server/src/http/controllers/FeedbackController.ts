import { GetFeedbacksResponse, SendFeedbackResponse, sendFeedbackBodyRequest } from '@tardis-enquete/contracts';
import { Request, Response } from 'express';

import ListFeedbacksUseCase from '../../domain/useCases/feedbacks/ListFeedbacksUseCase';
import SendFeedbackUseCase from '../../domain/useCases/feedbacks/SendFeedbackUseCase';

export default class FeedbackController {
  constructor(
    private readonly listFeedbacksUseCase: ListFeedbacksUseCase,
    private readonly sendFeedbackUseCase: SendFeedbackUseCase,
  ) {}

  async listFeedbacks(req: Request, res: Response) {
    const feedbacks = await this.listFeedbacksUseCase.execute();

    const response: GetFeedbacksResponse = {
      feedbacks,
    };

    return res.json(response);
  }

  async sendFeedback(req: Request, res: Response) {
    const { text, type } = sendFeedbackBodyRequest.parse(req.body);

    const userId = req.user!.id;

    const feedbackId = await this.sendFeedbackUseCase.execute({
      text,
      type,
      authorId: userId,
    });

    const response: SendFeedbackResponse = {
      feedbackId,
    };

    return res.status(201).json(response);
  }
}
