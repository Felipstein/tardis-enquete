import { Router } from 'express';

import { factoryPollController } from '../../infra/factories/controllers';
import { ensureAuth } from '../middlewares/ensureAuthMiddleware';

const route = Router();

const controller = factoryPollController();

route.post('/polls', ensureAuth('admin', 'developer'), controller.createPoll.bind(controller));

export { route as pollRoutes };
