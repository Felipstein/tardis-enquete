import { RouteModels } from '@tardis-enquete/contracts';
import { Router } from 'express';

import { factoryOAuthController } from '../../infra/factories/controllers';

const route = Router();

const controller = factoryOAuthController();

route.get(RouteModels.authDiscordLogin, controller.redirectToDiscordOAuthURL.bind(controller));

route.get(RouteModels.authDiscordCallback, controller.handleDiscordCallback.bind(controller));

route.get(RouteModels.authVerifyToken, controller.verifyToken.bind(controller));

export { route as oauthRoutes };
