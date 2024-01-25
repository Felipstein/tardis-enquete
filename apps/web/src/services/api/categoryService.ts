import {
  CreateCategoryBodyRequest,
  CreateCategoryResponse,
  DeleteCategoryParamsRequest,
  DeleteCategoryResponse,
  GetCategoriesForFilterResponse,
  GetCategoriesForSelectResponse,
  GetCategoriesResponse,
  RouteModels,
  UpdateCategoryBodyRequest,
  UpdateCategoryParamsRequest,
  UpdateCategoryResponse,
} from '@tardis-enquete/contracts';
import { api } from './apiService';

type CreateCategoryRequest = CreateCategoryBodyRequest;

type UpdateCategoryRequest = UpdateCategoryParamsRequest & UpdateCategoryBodyRequest;

type DeleteCategoryRequest = DeleteCategoryParamsRequest;

export default class CategoryService {
  async findCategories() {
    const response = await api.get<GetCategoriesResponse>(RouteModels.getCategories);

    return response.data.categories;
  }

  async findCategoriesForFilter() {
    const response = await api.get<GetCategoriesForFilterResponse>(RouteModels.getCategoriesForFilter);

    return response.data.categories;
  }

  async findCategoriesForSelect() {
    const response = await api.get<GetCategoriesForSelectResponse>(RouteModels.getCategoriesForSelect);

    return response.data.categories;
  }

  async create(data: CreateCategoryRequest) {
    const response = await api.post<CreateCategoryResponse>(RouteModels.createCategory, data);

    return response.data.category;
  }

  async update({ categoryId, ...data }: UpdateCategoryRequest) {
    const response = await api.put<UpdateCategoryResponse>(
      RouteModels.buildRoute(RouteModels.updateCategory, { categoryId }),
      data,
    );

    return response.data.category;
  }

  async delete({ categoryId }: DeleteCategoryRequest) {
    const response = await api.delete<DeleteCategoryResponse>(
      RouteModels.buildRoute(RouteModels.deleteCategory, { categoryId }),
    );

    return response.data;
  }
}

export const categoryService = new CategoryService();
