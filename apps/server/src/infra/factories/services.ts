import DiscordService from '../../services/DiscordService';
import TokenService from '../../services/TokenService';

const discordService = new DiscordService();

export function factoryDiscordService() {
  return discordService;
}

const tokenService = new TokenService();

export function factoryTokenService() {
  return tokenService;
}
