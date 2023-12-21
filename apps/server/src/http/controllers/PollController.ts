import { CreatePollResponse, createPollBodyRequest } from '@tardis-enquete/contracts';
import { Request, Response } from 'express';

import CreatePollUseCase from '../../domain/useCases/polls/CreatePollUseCase';

export default class PollController {
  constructor(private readonly createPollUseCase: CreatePollUseCase) {}

  async createPoll(req: Request, res: Response) {
    const data = createPollBodyRequest.parse(req.body);

    const userId = req.user!.id;

    const poll = await this.createPollUseCase.execute({
      ...data,
      authorId: userId,
    });

    const response: CreatePollResponse = {
      pollId: poll.id,
    };

    return res.status(201).json(response);
  }
}
