import { z } from 'zod';

import { User } from '../../types/User';

export const verifyTokenQueryRequest = z.object({
  t: z.string({ required_error: 'Token é obrigatório', invalid_type_error: 'Token deve ser um texto' }),
});

export type VerifyTokenQueryRequest = z.infer<typeof verifyTokenQueryRequest>;

export type VerifyTokenResponse = {
  user: Omit<User, 'auth'>;
};
