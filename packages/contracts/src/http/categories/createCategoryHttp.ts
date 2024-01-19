import { z } from 'zod';

import { Category } from '../../types';

export const createCategoryBodyRequest = z.object({
  name: z.string({
    required_error: 'Nome da categoria é obrigatório',
    invalid_type_error: 'Nome da categoria deve ser um texto',
  }),
  description: z.string({ invalid_type_error: 'Descrição deve ser um texto' }).optional(),
});

export type CreateCategoryBodyRequest = z.infer<typeof createCategoryBodyRequest>;

export type CreateCategoryResponse = {
  category: Category;
};
