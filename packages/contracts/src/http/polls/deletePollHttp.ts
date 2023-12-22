import { z } from 'zod';

export const deletePollParamsRequest = z.object({
  pollId: z.string({
    required_error: 'ID da enquete é obrigatório',
    invalid_type_error: 'ID da enquete deve ser um texto',
  }),
});

export type DeletePollParamsRequest = z.infer<typeof deletePollParamsRequest>;
