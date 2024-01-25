import { PrismaClient } from '@prisma/client';
import { Category } from '@tardis-enquete/contracts';

import UserService from '../../../services/UserService';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import IPollsRepository from '../../repositories/PollsRepository';

type IOutput = Category[];

export default class FindCategoriesUseCase {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UserService,
    private readonly pollsRepository: IPollsRepository,
  ) {}

  async execute(): Promise<IOutput> {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    const categoriesPopuledPromises = categories.map(async (category) => {
      const [totalPolls, author, authorTotalPolls] = await Promise.all([
        this.pollsRepository.countTotalPollsOfCategoryId(category.id),
        this._findUserInfo(category.authorId),
        this.pollsRepository.countTotalPollsOfUserId(category.authorId),
      ]);

      return {
        id: category.id,
        name: category.name,
        description: category.description,
        createdAt: category.createdAt,
        author: {
          id: author.id,
          username: author.username,
          globalName: author.globalName,
          avatar: author.avatar,
          totalPolls: authorTotalPolls,
        },
        totalPolls,
      };
    });

    return Promise.all(categoriesPopuledPromises);
  }

  private async _findUserInfo(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new StoredUserNotExists(`Não há informações do usuário ${userId} cadastradas ainda`);
    }

    return user;
  }
}
