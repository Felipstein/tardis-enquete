import OAuthController from '../../http/controllers/OAuthController';

import { factoryStoredUsersRepository } from './repositories';
import { factoryDiscordService } from './services';

const oAuthController = new OAuthController(factoryDiscordService(), factoryStoredUsersRepository());

export function factoryOAuthController() {
  return oAuthController;
}
