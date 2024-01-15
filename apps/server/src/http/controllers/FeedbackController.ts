import {
  GetFeedbacksResponse,
  SendFeedbackResponse,
  closeFeedbackParamsRequest,
  deleteFeedbackParamsRequest,
  sendFeedbackBodyRequest,
} from '@tardis-enquete/contracts';
import { Request, Response } from 'express';

import CloseFeedbackUseCase from '../../domain/useCases/feedbacks/CloseFeedbackUseCase';
import DeleteFeedbackUseCase from '../../domain/useCases/feedbacks/DeleteFeedbackUseCase';
import ListFeedbacksUseCase from '../../domain/useCases/feedbacks/ListFeedbacksUseCase';
import SendFeedbackUseCase from '../../domain/useCases/feedbacks/SendFeedbackUseCase';

export default class FeedbackController {
  constructor(
    private readonly listFeedbacksUseCase: ListFeedbacksUseCase,
    private readonly sendFeedbackUseCase: SendFeedbackUseCase,
    private readonly closeFeedbackUseCase: CloseFeedbackUseCase,
    private readonly deleteFeedbackUseCase: DeleteFeedbackUseCase,
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

  async closeFeedback(req: Request, res: Response) {
    const { feedbackId } = closeFeedbackParamsRequest.parse(req.params);

    await this.closeFeedbackUseCase.execute({ feedbackId });

    return res.sendStatus(204);
  }

  async deleteFeedback(req: Request, res: Response) {
    const { feedbackId } = deleteFeedbackParamsRequest.parse(req.params);

    await this.deleteFeedbackUseCase.execute({ feedbackId });

    return res.sendStatus(204);
  }
}
