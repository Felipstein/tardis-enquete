import { z } from 'zod';

export const createPollBodyRequest = z.object({
  title: z.string({ required_error: 'Título é obrigatório', invalid_type_error: 'Título deve ser um texto' }),
  description: z.string({
    required_error: 'Descrição é obrigatória',
    invalid_type_error: 'Descrição deve ser um texto',
  }),
  expireAt: z.coerce.date({
    required_error: 'Data de expiração é obrigatória',
    invalid_type_error: 'O formato da Data de expiração está inválido',
  }),
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
  pollId: string;
};
