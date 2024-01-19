import {
  CreateCategoryResponse,
  GetCategoriesForFilterResponse,
  GetCategoriesForSelectResponse,
  GetCategoriesResponse,
  UpdateCategoryResponse,
  createCategoryBodyRequest,
  deleteCategoryParamsRequest,
  updateCategoryBodyRequest,
  updateCategoryParamsRequest,
} from '@tardis-enquete/contracts';
import { Request, Response } from 'express';

import CreateCategoryUseCase from '../../domain/useCases/categories/CreateCategoryUseCase';
import DeleteCategoryUseCase from '../../domain/useCases/categories/DeleteCategoryUseCase';
import FindCategoriesForFilterUseCase from '../../domain/useCases/categories/FindCategoriesForFilterUseCase';
import FindCategoriesForSelectUseCase from '../../domain/useCases/categories/FindCategoriesForSelectUseCase';
import FindCategoriesUseCase from '../../domain/useCases/categories/FindCategoriesUseCase';
import UpdateCategoryUseCase from '../../domain/useCases/categories/UpdateCategoryUseCase';

export default class CategoryController {
  constructor(
    private readonly findCategoriesUseCase: FindCategoriesUseCase,
    private readonly findCategoriesForFilterUseCase: FindCategoriesForFilterUseCase,
    private readonly findCategoriesForSelectUseCase: FindCategoriesForSelectUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  async findCategories(req: Request, res: Response) {
    const categories = await this.findCategoriesUseCase.execute();

    const response: GetCategoriesResponse = {
      categories,
    };

    return res.json(response);
  }

  async findCategoriesForFilter(req: Request, res: Response) {
    const categories = await this.findCategoriesForFilterUseCase.execute();

    const response: GetCategoriesForFilterResponse = {
      categories,
    };

    return res.json(response);
  }

  async findCategoriesForSelect(req: Request, res: Response) {
    const categories = await this.findCategoriesForSelectUseCase.execute();

    const response: GetCategoriesForSelectResponse = {
      categories,
    };

    return res.json(response);
  }

  async create(req: Request, res: Response) {
    const { name, description } = createCategoryBodyRequest.parse(req.body);

    const userId = req.user!.id;

    const category = await this.createCategoryUseCase.execute({ name, description, authorId: userId });

    const response: CreateCategoryResponse = {
      category,
    };

    return res.status(201).json(response);
  }

  async update(req: Request, res: Response) {
    const { categoryId } = updateCategoryParamsRequest.parse(req.params);
    const data = updateCategoryBodyRequest.parse(req.body);

    const category = await this.updateCategoryUseCase.execute({ categoryId, ...data });

    const response: UpdateCategoryResponse = {
      category,
    };

    return res.json(response);
  }

  async delete(req: Request, res: Response) {
    const { categoryId } = deleteCategoryParamsRequest.parse(req.params);

    await this.deleteCategoryUseCase.execute({ categoryId });

    return res.sendStatus(204);
  }
}
