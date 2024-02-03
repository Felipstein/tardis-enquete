import { z } from 'zod';

import { Poll } from '../../types';

const optionId = z.string({
  invalid_type_error: 'ID da opção deve ser um texto',
  required_error: 'ID da opção deve ser preenchido',
});

const optionText = z.string({
  invalid_type_error: 'Cada opção deve ser um texto',
  required_error: 'Cada opção deve ser preenchida',
});

const optionPosition = z
  .number({
    invalid_type_error: 'A posição de cada opção deve ser um número',
    required_error: 'A posição de cada opção deve ser preenchida',
  })
  .min(1, 'A posição de cada opção deve ser maior ou igual a 1');

const updateOption = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('create'),
    text: optionText,
    position: optionPosition,
  }),
  z.object({
    action: z.literal('update'),
    id: optionId,
    text: optionText,
    position: optionPosition,
  }),
  z.object({
    action: z.literal('delete'),
    id: optionId,
  }),
]);

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
  categoryId: z.string({ invalid_type_error: 'Categoria deve ser um texto' }).nullable().optional(),
  expireAt: z.coerce
    .date({
      invalid_type_error: 'O formato da Data de expiração está inválido',
    })
    .nullable()
    .optional(),
  options: z
    .array(updateOption, {
      invalid_type_error: 'Opções devem ser uma lista',
      required_error: 'Opções devem ser preenchidas',
    })
    .min(2, 'Pelo menos duas opções devem ser preenchidas')
    .optional(),
});

export type UpdatePollParamsRequest = z.infer<typeof updatePollParamsRequest>;

export type UpdatePollBodyRequest = z.infer<typeof updatePollBodyRequest>;

export type UpdatePollResponse = {
  poll: Poll;
};
