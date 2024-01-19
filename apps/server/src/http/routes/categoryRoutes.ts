import { RouteModels } from '@tardis-enquete/contracts';
import { Router } from 'express';

import { factoryCategoryController } from '../../infra/factories/controllers';
import { ensureAuth } from '../middlewares/ensureAuthMiddleware';

const route = Router();

const controller = factoryCategoryController();

route.get(RouteModels.getCategories, ensureAuth('admin', 'developer'), controller.findCategories.bind(controller));
route.get(RouteModels.getCategoriesForFilter, ensureAuth(), controller.findCategoriesForFilter.bind(controller));
route.get(RouteModels.getCategoriesForSelect, ensureAuth(), controller.findCategoriesForSelect.bind(controller));

route.post(RouteModels.createCategory, ensureAuth('admin', 'developer'), controller.create.bind(controller));

route.put(RouteModels.updateCategory, ensureAuth('admin', 'developer'), controller.update.bind(controller));

route.delete(RouteModels.deleteCategory, ensureAuth('admin', 'developer'), controller.delete.bind(controller));

export { route as categoryRoutes };
