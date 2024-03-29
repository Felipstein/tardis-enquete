import { Router } from 'express';

import { categoryRoutes } from './categoryRoutes';
import { devToolsRoutes } from './devToolsRoutes';
import { feedbackRoutes } from './feedbackRoutes';
import { oauthRoutes } from './oauthRoutes';
import { pollRoutes } from './pollRoutes';
import { voteRoutes } from './voteRoutes';

const routes = Router();

routes.use(categoryRoutes);
routes.use(devToolsRoutes);
routes.use(feedbackRoutes);
routes.use(oauthRoutes);
routes.use(pollRoutes);
routes.use(voteRoutes);

export { routes };
