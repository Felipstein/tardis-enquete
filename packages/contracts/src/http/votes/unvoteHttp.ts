import { z } from 'zod';

export const unvoteParamsRequest = z.object({
  voteId: z.string({ required_error: 'ID do voto é obrigatório', invalid_type_error: 'ID do voto deve ser um texto' }),
});

export type UnvoteParamsRequest = z.infer<typeof unvoteParamsRequest>;

export type UnvoteResponse = void;
