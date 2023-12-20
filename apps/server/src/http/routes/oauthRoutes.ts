import { Router } from 'express';

import { factoryOAuthController } from '../../infra/factories/controllers';

const route = Router();

const controller = factoryOAuthController();

route.get('/auth/discord/login', controller.redirectToDiscordOAuthURL.bind(controller));

route.get('/auth/discord/callback', controller.handleDiscordCallback.bind(controller));

export { route as oauthRoutes };
