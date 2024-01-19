import { z } from 'zod';

import { Category } from '../../types';

export const updateCategoryParamsRequest = z.object({
  categoryId: z.string(),
});

export const updateCategoryBodyRequest = z.object({
  name: z
    .string({
      invalid_type_error: 'Nome da categoria deve ser um texto',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Descrição deve ser um texto',
    })
    .nullable()
    .optional(),
});

export type UpdateCategoryParamsRequest = z.infer<typeof updateCategoryParamsRequest>;

export type UpdateCategoryBodyRequest = z.infer<typeof updateCategoryBodyRequest>;

export type UpdateCategoryResponse = {
  category: Category;
};
