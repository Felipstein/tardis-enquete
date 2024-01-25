import { z } from 'zod';

import { Poll } from '../../types';

export const createPollBodyRequest = z.object({
  title: z.string({ required_error: 'Título é obrigatório', invalid_type_error: 'Título deve ser um texto' }),
  description: z
    .string({
      invalid_type_error: 'Descrição deve ser um texto',
    })
    .optional(),
  categoryId: z.string({ invalid_type_error: 'Categoria deve ser um texto' }).optional(),
  expireAt: z.coerce
    .date({
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
    .min(2, 'Pelo menos duas opções devem ser preenchidas'),
});

export type CreatePollBodyRequest = z.infer<typeof createPollBodyRequest>;

export type CreatePollResponse = {
  poll: Poll;
};
