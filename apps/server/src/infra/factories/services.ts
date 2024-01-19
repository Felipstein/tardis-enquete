import DiscordService from '../../services/DiscordService';
import PolulatePollService from '../../services/PopulatePollService';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';

import { factoryPrismaClient } from './prismaClient';
import { factoryPollsRepository, factoryStoredUsersRepository } from './repositories';

const discordService = new DiscordService();

export function factoryDiscordService() {
  return discordService;
}

const userService = new UserService(factoryStoredUsersRepository(), factoryDiscordService());

export function factoryUserService() {
  return userService;
}

const tokenService = new TokenService();

export function factoryTokenService() {
  return tokenService;
}

const polulatePollService = new PolulatePollService(
  factoryPrismaClient(),
  factoryPollsRepository(),
  factoryUserService(),
);

export function factoryPolulatePollService() {
  return polulatePollService;
}
