import { PrismaClient } from '@prisma/client';
import { SocketEventPayload } from '@tardis-enquete/contracts';

import { io } from '../../../http/app';
import CategoryNotExists from '../../errors/CategoryNotExists';

import FindCategoriesForSelectUseCase from './FindCategoriesForSelectUseCase';

type IInput = {
  categoryId: string;
};

type IOutput = void;

export default class DeleteCategoryUseCase {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly findCategoriesForSelectUseCase: FindCategoriesForSelectUseCase,
  ) {}

  async execute({ categoryId }: IInput): Promise<IOutput> {
    const categoryExists = await this.prisma.category.findUnique({ where: { id: categoryId }, select: { id: true } });

    if (!categoryExists) {
      throw new CategoryNotExists();
    }

    if (process.env.NODE_ENV !== 'test') {
      this.findCategoriesForSelectUseCase.execute().then((categories) => {
        io.emit('updateCategoriesSelect', { categories } as SocketEventPayload<'updateCategoriesSelect'>);
      });
    }

    await this.prisma.category.delete({ where: { id: categoryId } });
  }
}
