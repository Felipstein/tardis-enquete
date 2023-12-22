import { CreatePollResponse, GetPollsResponse, createPollBodyRequest } from '@tardis-enquete/contracts';
import { Request, Response } from 'express';

import CreatePollUseCase from '../../domain/useCases/polls/CreatePollUseCase';
import FindPollsUseCase from '../../domain/useCases/polls/FindPollsUseCase';

export default class PollController {
  constructor(
    private readonly findPollsUseCase: FindPollsUseCase,
    private readonly createPollUseCase: CreatePollUseCase,
  ) {}

  async findPolls(req: Request, res: Response) {
    const polls = await this.findPollsUseCase.execute();

    const response: GetPollsResponse = {
      polls,
    };

    return res.json(response);
  }

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
