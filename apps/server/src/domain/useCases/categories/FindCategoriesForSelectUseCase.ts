import { PrismaClient } from '@prisma/client';
import { CategorySelectInfo } from '@tardis-enquete/contracts';

type IOutput = CategorySelectInfo[];

export default class FindCategoriesForSelectUseCase {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(): Promise<IOutput> {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    const categoriesPopuledPromises = categories.map(
      async (category) =>
        ({
          id: category.id,
          name: category.name,
        }) satisfies CategorySelectInfo,
    );

    return Promise.all(categoriesPopuledPromises);
  }
}
