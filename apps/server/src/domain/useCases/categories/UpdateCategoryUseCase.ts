import { PrismaClient } from '@prisma/client';
import { Category, SocketEventPayload } from '@tardis-enquete/contracts';

import { io } from '../../../http/app';
import UserService from '../../../services/UserService';
import CategoryNotExists from '../../errors/CategoryNotExists';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import IPollsRepository from '../../repositories/PollsRepository';

import FindCategoriesForSelectUseCase from './FindCategoriesForSelectUseCase';

type IInput = {
  categoryId: string;
  name?: string;
  description?: string | null;
};

type IOutput = Category;

export default class UpdateCategoryUseCase {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UserService,
    private readonly pollsRepository: IPollsRepository,
    private readonly findCategoriesForSelectUseCase: FindCategoriesForSelectUseCase,
  ) {}

  async execute({ categoryId, ...data }: IInput): Promise<IOutput> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, authorId: true },
    });

    if (!category) {
      throw new CategoryNotExists();
    }

    const [categoryUpdated, totalPolls, author, authorTotalPolls] = await Promise.all([
      this.prisma.category.update({
        where: { id: categoryId },
        data,
      }),
      this.pollsRepository.countTotalPollsOfCategoryId(categoryId),
      this._findUserInfo(category.authorId),
      this.pollsRepository.countTotalPollsOfUserId(category.authorId),
    ]);

    if (process.env.NODE_ENV !== 'test') {
      this.findCategoriesForSelectUseCase.execute().then((categories) => {
        io.emit('updateCategoriesSelect', { categories } as SocketEventPayload<'updateCategoriesSelect'>);
      });
    }

    return {
      id: categoryUpdated.id,
      name: categoryUpdated.name,
      description: categoryUpdated.description,
      createdAt: categoryUpdated.createdAt,
      author: {
        id: author.id,
        username: author.username,
        globalName: author.globalName,
        avatar: author.avatar,
        totalPolls: authorTotalPolls,
      },
      totalPolls,
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
