import {
  CreatePollResponse,
  GetPollByIdResponse,
  GetPollsResponse,
  UpdatePollResponse,
  createPollBodyRequest,
  deletePollParamsRequest,
  getPollByIdParamsRequest,
  updatePollBodyRequest,
  updatePollParamsRequest,
} from '@tardis-enquete/contracts';
import { Request, Response } from 'express';

import CreatePollUseCase from '../../domain/useCases/polls/CreatePollUseCase';
import DeletePollUseCase from '../../domain/useCases/polls/DeletePollUseCase';
import FindPollByIdUseCase from '../../domain/useCases/polls/FindPollByIdUseCase';
import FindPollsUseCase from '../../domain/useCases/polls/FindPollsUseCase';
import UpdatePollUseCase from '../../domain/useCases/polls/UpdatePollUseCase';

export default class PollController {
  constructor(
    private readonly findPollsUseCase: FindPollsUseCase,
    private readonly findPollByIdUseCase: FindPollByIdUseCase,
    private readonly createPollUseCase: CreatePollUseCase,
    private readonly updatePollUseCase: UpdatePollUseCase,
    private readonly deletePollUseCase: DeletePollUseCase,
  ) {}

  async findPolls(req: Request, res: Response) {
    let polls = await this.findPollsUseCase.execute();

    const { id: userId, role: userRole } = req.user!;

    if (userRole === 'common') {
      polls = polls.map((poll) => {
        if (poll.expireAt && poll.expireAt < new Date()) {
          return poll;
        }

        return {
          ...poll,
          options: poll.options.map((option) => ({
            ...option,
            votes: option.votes.filter((vote) => vote.user.id === userId),
          })),
        };
      });
    }

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
      poll,
    };

    return res.status(201).json(response);
  }

  async updatePoll(req: Request, res: Response) {
    const { pollId } = updatePollParamsRequest.parse(req.params);
    const data = updatePollBodyRequest.parse(req.body);

    const poll = await this.updatePollUseCase.execute({ id: pollId, ...data });

    const response: UpdatePollResponse = {
      poll,
    };

    return res.json(response);
  }

  async deletePoll(req: Request, res: Response) {
    const { pollId } = deletePollParamsRequest.parse(req.params);

    await this.deletePollUseCase.execute({ pollId });

    return res.sendStatus(204);
  }
}
