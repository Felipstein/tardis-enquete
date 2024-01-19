import { z } from 'zod';

export const deleteCategoryParamsRequest = z.object({
  categoryId: z.string(),
});

export type DeleteCategoryParamsRequest = z.infer<typeof deleteCategoryParamsRequest>;

export type DeleteCategoryResponse = void;
