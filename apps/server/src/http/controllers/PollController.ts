import { Request, Response } from 'express';
import { z } from 'zod';

import CreatePollUseCase from '../../domain/useCases/polls/CreatePollUseCase';

const createPollBodyRequest = z.object({
  title: z.string({ required_error: 'Título é obrigatório', invalid_type_error: 'Título deve ser um texto' }),
  description: z.string({
    required_error: 'Descrição é obrigatória',
    invalid_type_error: 'Descrição deve ser um texto',
  }),
  expireAt: z.coerce.date({
    required_error: 'Data de expiração é obrigatória',
    invalid_type_error: 'O formato da Data de expiração está inválido',
  }),
});

export default class PollController {
  constructor(private readonly createPollUseCase: CreatePollUseCase) {}

  async createPoll(req: Request, res: Response) {
    const data = createPollBodyRequest.parse(req.body);

    const userId = req.user!.id;

    const poll = await this.createPollUseCase.execute({
      ...data,
      authorId: userId,
    });

    return res.status(201).json(poll.toObject());
  }
}
