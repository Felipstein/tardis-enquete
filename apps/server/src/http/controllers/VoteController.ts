import { VoteResponse, unvoteParamsRequest, voteParamsRequest } from '@tardis-enquete/contracts';
import { Request, Response } from 'express';

import UnvoteUseCase from '../../domain/useCases/votes/UnvoteUseCase';
import { UnvoteDTO } from '../../domain/useCases/votes/UnvoteUseCaseDTO';
import VoteUseCase from '../../domain/useCases/votes/VoteUseCase';
import { VoteDTO } from '../../domain/useCases/votes/VoteUseCaseDTO';

export default class VoteController {
  constructor(
    private readonly voteUseCase: VoteUseCase,
    private readonly unvoteUseCase: UnvoteUseCase,
  ) {}

  async vote(req: Request, res: Response) {
    const { optionId } = voteParamsRequest.parse(req.params);

    const userId = req.user!.id;

    const data: VoteDTO = { optionId, userId };

    const vote = await this.voteUseCase.execute(data);

    const response: VoteResponse = {
      voteId: vote.id,
    };

    return res.status(201).json(response);
  }

  async unvote(req: Request, res: Response) {
    const { voteId } = unvoteParamsRequest.parse(req.params);

    const byUser = req.user!;

    const onlySameUserCanUnvote = byUser.role === 'common';

    const data: UnvoteDTO = { userId: byUser.id, voteId, onlySameUserCanUnvote };

    await this.unvoteUseCase.execute(data);

    return res.sendStatus(204);
  }
}
