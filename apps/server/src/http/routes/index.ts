import { Router } from 'express';

import { oauthRoutes } from './oauthRoutes';

const routes = Router();

routes.use(oauthRoutes);

export { routes };
