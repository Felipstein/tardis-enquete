import {
  CreatePollResponse,
  GetPollByIdResponse,
  GetPollsResponse,
  createPollBodyRequest,
  deletePollParamsRequest,
  getPollByIdParamsRequest,
} from '@tardis-enquete/contracts';
import { Request, Response } from 'express';

import CreatePollUseCase from '../../domain/useCases/polls/CreatePollUseCase';
import DeletePollUseCase from '../../domain/useCases/polls/DeletePollUseCase';
import FindPollByIdUseCase from '../../domain/useCases/polls/FindPollByIdUseCase';
import FindPollsUseCase from '../../domain/useCases/polls/FindPollsUseCase';

export default class PollController {
  constructor(
    private readonly findPollsUseCase: FindPollsUseCase,
    private readonly findPollByIdUseCase: FindPollByIdUseCase,
    private readonly createPollUseCase: CreatePollUseCase,
    private readonly deletePollUseCase: DeletePollUseCase,
  ) {}

  async findPolls(req: Request, res: Response) {
    const polls = await this.findPollsUseCase.execute();

    const response: GetPollsResponse = {
      polls,
    };

    return res.json(response);
  }

  async findPollById(req: Request, res: Response) {
    const { pollId } = getPollByIdParamsRequest.parse(req.params);

    const poll = await this.findPollByIdUseCase.execute({ pollId });

    const response: GetPollByIdResponse = {
      poll,
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

  async deletePoll(req: Request, res: Response) {
    const { pollId } = deletePollParamsRequest.parse(req.params);

    await this.deletePollUseCase.execute({ pollId });

    return res.sendStatus(204);
  }
}
