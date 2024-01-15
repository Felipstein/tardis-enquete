import { z } from 'zod';

import { Poll } from '../../types';

export const updatePollParamsRequest = z.object({
  pollId: z.string(),
});

export const updatePollBodyRequest = z.object({
  title: z
    .string({ required_error: 'Título é obrigatório', invalid_type_error: 'Título deve ser um texto' })
    .optional(),
  description: z
    .string({
      required_error: 'Descrição é obrigatória',
      invalid_type_error: 'Descrição deve ser um texto',
    })
    .nullable()
    .optional(),
  expireAt: z.coerce
    .date({
      required_error: 'Data de expiração é obrigatória',
      invalid_type_error: 'O formato da Data de expiração está inválido',
    })
    .optional(),
  options: z
    .array(
      z.string({
        invalid_type_error: 'Cada opção deve ser um texto',
        required_error: 'Cada opção deve ser preenchida',
      }),
      { invalid_type_error: 'Opções devem ser uma lista de textos', required_error: 'Opções devem ser preenchidas' },
    )
    .min(2, 'Pelo menos duas opções devem ser preenchidas')
    .optional(),
});

export type UpdatePollParamsRequest = z.infer<typeof updatePollParamsRequest>;

export type UpdatePollBodyRequest = z.infer<typeof updatePollBodyRequest>;

export type UpdatePollResponse = {
  poll: Poll;
};
