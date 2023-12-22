import DevToolsController from '../../http/controllers/DevToolsController';
import OAuthController from '../../http/controllers/OAuthController';
import PollController from '../../http/controllers/PollController';

import { factoryDiscordService, factoryUserService } from './services';
import { factoryGenerateAccessTokenUseCase, factoryGetDiscordUserInfoUseCase } from './useCases/devToolsUseCase';
import { factoryCreatePollUseCase, factoryFindPollsUseCase } from './useCases/pollsUseCase';

const devToolsController = new DevToolsController(
  factoryGenerateAccessTokenUseCase(),
  factoryGetDiscordUserInfoUseCase(),
);

export function factoryDevToolsController() {
  return devToolsController;
}

const oAuthController = new OAuthController(factoryUserService(), factoryDiscordService());

export function factoryOAuthController() {
  return oAuthController;
}

const pollController = new PollController(factoryFindPollsUseCase(), factoryCreatePollUseCase());

export function factoryPollController() {
  return pollController;
}
