import OAuthController from '../../http/controllers/OAuthController';

import { factoryDiscordService, factoryUserService } from './services';

const oAuthController = new OAuthController(factoryUserService(), factoryDiscordService());

export function factoryOAuthController() {
  return oAuthController;
}
