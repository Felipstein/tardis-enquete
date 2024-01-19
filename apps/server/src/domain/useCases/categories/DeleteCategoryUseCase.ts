import { PrismaClient } from '@prisma/client';

import CategoryNotExists from '../../errors/CategoryNotExists';

type IInput = {
  categoryId: string;
};

type IOutput = void;

export default class DeleteCategoryUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute({ categoryId }: IInput): Promise<IOutput> {
    const categoryExists = await this.prisma.category.findUnique({ where: { id: categoryId }, select: {} });

    if (categoryExists) {
      throw new CategoryNotExists();
    }

    await this.prisma.category.delete({ where: { id: categoryId } });
  }
}
