import { Router } from 'express';

import { devToolsRoutes } from './devToolsRoutes';
import { oauthRoutes } from './oauthRoutes';
import { pollRoutes } from './pollRoutes';

const routes = Router();

routes.use(devToolsRoutes);
routes.use(oauthRoutes);
routes.use(pollRoutes);

export { routes };
