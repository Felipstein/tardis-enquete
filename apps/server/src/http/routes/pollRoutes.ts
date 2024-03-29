import { RouteModels } from '@tardis-enquete/contracts';
import { Router } from 'express';

import { factoryPollController } from '../../infra/factories/controllers';
import { ensureAuth } from '../middlewares/ensureAuthMiddleware';

const route = Router();

const controller = factoryPollController();

route.get(RouteModels.getPolls, ensureAuth(), controller.findPolls.bind(controller));
route.get(RouteModels.getPoll, ensureAuth(), controller.findPollById.bind(controller));

route.post(RouteModels.createPoll, ensureAuth('admin', 'developer'), controller.createPoll.bind(controller));

route.put(RouteModels.updatePoll, ensureAuth('admin', 'developer'), controller.updatePoll.bind(controller));
route.patch(
  RouteModels.changePollClosedStatus,
  ensureAuth('admin', 'developer'),
  controller.changePollClosedStatus.bind(controller),
);

route.delete(RouteModels.deletePoll, ensureAuth('admin', 'developer'), controller.deletePoll.bind(controller));

export { route as pollRoutes };
