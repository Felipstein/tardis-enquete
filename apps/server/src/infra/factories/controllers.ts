import CategoryController from '../../http/controllers/CategoryController';
import DevToolsController from '../../http/controllers/DevToolsController';
import FeedbackController from '../../http/controllers/FeedbackController';
import OAuthController from '../../http/controllers/OAuthController';
import PollController from '../../http/controllers/PollController';
import VoteController from '../../http/controllers/VoteController';

import { factoryDiscordService, factoryTokenService, factoryUserService } from './services';
import {
  factoryCreateCategoryUseCase,
  factoryDeleteCategoryUseCase,
  factoryFindCategoriesForFilterUseCase,
  factoryFindCategoriesForSelectUseCase,
  factoryFindCategoriesUseCase,
  factoryUpdateCategoryUseCase,
} from './useCases/categoriesUseCase';
import { factoryGenerateAccessTokenUseCase, factoryGetDiscordUserInfoUseCase } from './useCases/devToolsUseCase';
import {
  factoryCloseFeedbackUseCase,
  factoryDeleteFeedbackUseCase,
  factoryListFeedbacksUseCase,
  factorySendFeedbackUseCase,
} from './useCases/feedbacksUseCase';
import {
  factoryChangePollClosedStatusUseCase,
  factoryCreatePollUseCase,
  factoryDeletePollUseCase,
  factoryFindPollByIdUseCase,
  factoryFindPollsUseCase,
  factoryUpdatePollUseCase,
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
  factoryUpdatePollUseCase(),
  factoryChangePollClosedStatusUseCase(),
  factoryDeletePollUseCase(),
);

export function factoryPollController() {
  return pollController;
}

const voteController = new VoteController(factoryVoteUseCase(), factoryUnvoteUseCase());

export function factoryVoteController() {
  return voteController;
}

const feedbackController = new FeedbackController(
  factoryListFeedbacksUseCase(),
  factorySendFeedbackUseCase(),
  factoryCloseFeedbackUseCase(),
  factoryDeleteFeedbackUseCase(),
);

export function factoryFeedbackController() {
  return feedbackController;
}

const categoryController = new CategoryController(
  factoryFindCategoriesUseCase(),
  factoryFindCategoriesForFilterUseCase(),
  factoryFindCategoriesForSelectUseCase(),
  factoryCreateCategoryUseCase(),
  factoryUpdateCategoryUseCase(),
  factoryDeleteCategoryUseCase(),
);

export function factoryCategoryController() {
  return categoryController;
}
