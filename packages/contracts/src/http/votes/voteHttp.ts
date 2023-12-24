import { z } from 'zod';

export const voteParamsRequest = z.object({
  optionId: z.string({
    required_error: 'ID da opção é obrigatório',
    invalid_type_error: 'ID da opção deve ser um texto',
  }),
});

export type VoteParamsRequest = z.infer<typeof voteParamsRequest>;

export type VoteResponse = {
  voteId: string;
};
