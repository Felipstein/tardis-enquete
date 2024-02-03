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
      z.object({
        text: z.string({
          invalid_type_error: 'Cada opção deve ser um texto',
          required_error: 'Cada opção deve ser preenchida',
        }),
        position: z
          .number({
            invalid_type_error: 'A posição de cada opção deve ser um número',
            required_error: 'A posição de cada opção deve ser preenchida',
          })
          .min(1, 'A posição de cada opção deve ser maior ou igual a 1'),
      }),
      { invalid_type_error: 'Opções devem ser uma lista.', required_error: 'Opções devem ser preenchidas' },
    )
    .min(2, 'Pelo menos duas opções devem ser preenchidas'),
});

export type CreatePollBodyRequest = z.infer<typeof createPollBodyRequest>;

export type CreatePollResponse = {
  poll: Poll;
};
