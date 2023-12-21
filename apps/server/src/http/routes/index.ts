import { Router } from 'express';

import { oauthRoutes } from './oauthRoutes';
import { pollRoutes } from './pollRoutes';

const routes = Router();

routes.use(oauthRoutes);
routes.use(pollRoutes);

export { routes };
