import { Poll } from 'types/Poll';
import { z } from 'zod';

export const getPollByIdParamsRequest = z.object({
  pollId: z.string({
    required_error: 'ID da enquete é obrigatório',
    invalid_type_error: 'ID da enquete deve ser um texto',
  }),
});

export type GetPollByIdParamsRequest = z.infer<typeof getPollByIdParamsRequest>;

export type GetPollByIdResponse = {
  poll: Poll;
};
