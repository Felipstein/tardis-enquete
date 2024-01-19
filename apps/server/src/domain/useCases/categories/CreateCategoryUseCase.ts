import { PrismaClient } from '@prisma/client';
import { Category } from '@tardis-enquete/contracts';

import UserService from '../../../services/UserService';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import IPollsRepository from '../../repositories/PollsRepository';

type IInput = {
  name: string;
  description?: string;
  authorId: string;
};

type IOutput = Category;

export default class CreateCategoryUseCase {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UserService,
    private readonly pollsRepository: IPollsRepository,
  ) {}

  async execute(data: IInput): Promise<IOutput> {
    const [category, author, authorTotalPolls] = await Promise.all([
      this.prisma.category.create({ data }),
      this._findUserInfo(data.authorId),
      this.pollsRepository.countTotalPollsOfUserId(data.authorId),
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
      totalPolls: 0,
    };
  }

  private async _findUserInfo(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new StoredUserNotExists(`Não há informações do usuário ${userId} cadastradas ainda`);
    }

    return user;
  }
}
