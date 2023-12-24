import { RouteModels } from '@tardis-enquete/contracts';
import { Router } from 'express';

import { factoryVoteController } from '../../infra/factories/controllers';
import { ensureAuth } from '../middlewares/ensureAuthMiddleware';

const route = Router();

const controller = factoryVoteController();

route.post(RouteModels.vote, ensureAuth(), controller.vote.bind(controller));

route.delete(RouteModels.unvote, ensureAuth(), controller.unvote.bind(controller));

export { route as voteRoutes };
