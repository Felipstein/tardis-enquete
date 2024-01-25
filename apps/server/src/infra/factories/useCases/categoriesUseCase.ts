import CreateCategoryUseCase from '../../../domain/useCases/categories/CreateCategoryUseCase';
import DeleteCategoryUseCase from '../../../domain/useCases/categories/DeleteCategoryUseCase';
import FindCategoriesForFilterUseCase from '../../../domain/useCases/categories/FindCategoriesForFilterUseCase';
import FindCategoriesForSelectUseCase from '../../../domain/useCases/categories/FindCategoriesForSelectUseCase';
import FindCategoriesUseCase from '../../../domain/useCases/categories/FindCategoriesUseCase';
import UpdateCategoryUseCase from '../../../domain/useCases/categories/UpdateCategoryUseCase';
import { factoryPrismaClient } from '../prismaClient';
import { factoryPollsRepository } from '../repositories';
import { factoryUserService } from '../services';

const findCategoriesUseCase = new FindCategoriesUseCase(
  factoryPrismaClient(),
  factoryUserService(),
  factoryPollsRepository(),
);

export function factoryFindCategoriesUseCase() {
  return findCategoriesUseCase;
}

const findCategoriesForFilterUseCase = new FindCategoriesForFilterUseCase(
  factoryPrismaClient(),
  factoryPollsRepository(),
);

export function factoryFindCategoriesForFilterUseCase() {
  return findCategoriesForFilterUseCase;
}

const findCategoriesForSelectUseCase = new FindCategoriesForSelectUseCase(factoryPrismaClient());

export function factoryFindCategoriesForSelectUseCase() {
  return findCategoriesForSelectUseCase;
}

const createCategoryUseCase = new CreateCategoryUseCase(
  factoryPrismaClient(),
  factoryUserService(),
  factoryPollsRepository(),
  factoryFindCategoriesForSelectUseCase(),
);

export function factoryCreateCategoryUseCase() {
  return createCategoryUseCase;
}

const updateCategoryUseCase = new UpdateCategoryUseCase(
  factoryPrismaClient(),
  factoryUserService(),
  factoryPollsRepository(),
  factoryFindCategoriesForSelectUseCase(),
);

export function factoryUpdateCategoryUseCase() {
  return updateCategoryUseCase;
}

const deleteCategoryUseCase = new DeleteCategoryUseCase(factoryPrismaClient(), factoryFindCategoriesForSelectUseCase());

export function factoryDeleteCategoryUseCase() {
  return deleteCategoryUseCase;
}
