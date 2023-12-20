import DiscordService from '../../services/DiscordService';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';

import { factoryStoredUsersRepository } from './repositories';

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
