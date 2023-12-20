import DiscordService from '../../services/DiscordService';

const discordService = new DiscordService();

export function factoryDiscordService() {
  return discordService;
}
