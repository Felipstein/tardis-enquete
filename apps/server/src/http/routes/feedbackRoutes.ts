import { RouteModels } from '@tardis-enquete/contracts';
import { Router } from 'express';

import { factoryFeedbackController } from '../../infra/factories/controllers';
import { ensureAuth } from '../middlewares/ensureAuthMiddleware';

const route = Router();

const controller = factoryFeedbackController();

route.get(RouteModels.getFeedbacks, ensureAuth('developer'), controller.listFeedbacks.bind(controller));

route.post(RouteModels.sendFeedback, ensureAuth(), controller.sendFeedback.bind(controller));

export { route as feedbackRoutes };
