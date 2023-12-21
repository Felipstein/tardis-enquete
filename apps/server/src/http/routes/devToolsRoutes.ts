import { RouteModels } from '@tardis-enquete/contracts';
import { Router } from 'express';

import { factoryDevToolsController } from '../../infra/factories/controllers';

const route = Router();

const controller = factoryDevToolsController();

if (process.env.NODE_ENV === 'development') {
  route.post(RouteModels.devGenerateAccessToken, controller.generateAccessToken.bind(controller));

  route.get(RouteModels.devGetDiscordUserInfo, controller.getDiscordUserInfo.bind(controller));
}

export { route as devToolsRoutes };
