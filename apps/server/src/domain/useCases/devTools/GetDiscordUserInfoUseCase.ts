import DiscordService from '../../../services/DiscordService';
import NotFound from '../../errors/NotFound';

import { GetDiscordUserInfoUseCaseDTO } from './GetDiscordUserInfoUseCaseDTO';

export default class GetDiscordUserInfoUseCase {
  constructor(private readonly discordService: DiscordService) {}

  async execute({ userId, discordToken }: GetDiscordUserInfoUseCaseDTO) {
    const discordUserInfo = await this.discordService.getUserInfoByUserId(userId, discordToken);

    if (!discordUserInfo) {
      throw new NotFound(`Discord User with id ${userId} not found`);
    }

    return discordUserInfo;
  }
}
