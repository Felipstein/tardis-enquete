import DiscordService from '../../../services/DiscordService';

import { GetDiscordUserInfoUseCaseDTO } from './GetDiscordUserInfoUseCaseDTO';

export default class GetDiscordUserInfoUseCase {
  constructor(private readonly discordService: DiscordService) {}

  async execute({ discordToken }: GetDiscordUserInfoUseCaseDTO) {
    const discordUserInfo = await this.discordService.getUserInfo(discordToken);

    return discordUserInfo;
  }
}
