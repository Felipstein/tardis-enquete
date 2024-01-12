import DevToolsController from '../../http/controllers/DevToolsController';
import OAuthController from '../../http/controllers/OAuthController';
import PollController from '../../http/controllers/PollController';
import VoteController from '../../http/controllers/VoteController';

import { factoryDiscordService, factoryTokenService, factoryUserService } from './services';
import { factoryGenerateAccessTokenUseCase, factoryGetDiscordUserInfoUseCase } from './useCases/devToolsUseCase';
import {
  factoryCreatePollUseCase,
  factoryDeletePollUseCase,
  factoryFindPollByIdUseCase,
  factoryFindPollsUseCase,
} from './useCases/pollsUseCase';
import { factoryUnvoteUseCase, factoryVoteUseCase } from './useCases/votesUseCase';

const devToolsController = new DevToolsController(
  factoryGenerateAccessTokenUseCase(),
  factoryGetDiscordUserInfoUseCase(),
);

export function factoryDevToolsController() {
  return devToolsController;
}

const oAuthController = new OAuthController(factoryUserService(), factoryDiscordService(), factoryTokenService());

export function factoryOAuthController() {
  return oAuthController;
}

const pollController = new PollController(
  factoryFindPollsUseCase(),
  factoryFindPollByIdUseCase(),
  factoryCreatePollUseCase(),
  factoryDeletePollUseCase(),
);

export function factoryPollController() {
  return pollController;
}

const voteController = new VoteController(factoryVoteUseCase(), factoryUnvoteUseCase());

export function factoryVoteController() {
  return voteController;
}
