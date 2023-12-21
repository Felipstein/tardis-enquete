import DevToolsController from '../../http/controllers/DevToolsController';
import OAuthController from '../../http/controllers/OAuthController';
import PollController from '../../http/controllers/PollController';

import { factoryDiscordService, factoryUserService } from './services';
import { factoryGenerateAccessTokenUseCase } from './useCases/devToolsUseCase';
import { factoryCreatePollUseCase } from './useCases/pollsUseCase';

const devToolsController = new DevToolsController(factoryGenerateAccessTokenUseCase());

export function factoryDevToolsController() {
  return devToolsController;
}

const oAuthController = new OAuthController(factoryUserService(), factoryDiscordService());

export function factoryOAuthController() {
  return oAuthController;
}

const pollController = new PollController(factoryCreatePollUseCase());

export function factoryPollController() {
  return pollController;
}
