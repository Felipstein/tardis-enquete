import { PrismaClient } from '@prisma/client';
import { CategoryFilter } from '@tardis-enquete/contracts';

import IPollsRepository from '../../repositories/PollsRepository';

type IOutput = CategoryFilter[];

export default class FindCategoriesForFilterUseCase {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly pollsRepository: IPollsRepository,
  ) {}

  async execute(): Promise<IOutput> {
    const categories = await this.prisma.category.findMany();

    const categoriesPopuledPromises = categories.map(async (category) => {
      const totalPolls = await this.pollsRepository.countTotalPollsOfCategoryId(category.id);

      return {
        id: category.id,
        name: category.name,
        description: category.description,
        totalPolls,
      } satisfies CategoryFilter;
    });

    return Promise.all(categoriesPopuledPromises);
  }
}
