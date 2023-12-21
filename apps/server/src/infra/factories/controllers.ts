import OAuthController from '../../http/controllers/OAuthController';
import PollController from '../../http/controllers/PollController';

import { factoryDiscordService, factoryUserService } from './services';
import { factoryCreatePollUseCase } from './useCases/pollsUseCase';

const oAuthController = new OAuthController(factoryUserService(), factoryDiscordService());

export function factoryOAuthController() {
  return oAuthController;
}

const pollController = new PollController(factoryCreatePollUseCase());

export function factoryPollController() {
  return pollController;
}
