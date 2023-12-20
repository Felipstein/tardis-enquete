import StoredUser from '../domain/entities/StoredUser';
import User from '../domain/entities/User';
import IStoredUsersRepository from '../domain/repositories/StoredUsersStoredRepository';

import DiscordService from './DiscordService';
import { ExchangeCodeForTokenResponse } from './DiscordServiceDTO';

export default class UserService {
  constructor(
    private readonly storedUsersRepository: IStoredUsersRepository,
    private readonly discordService: DiscordService,
  ) {}

  async findById(id: string): Promise<User | null> {
    const storedUser = await this.storedUsersRepository.findById(id);

    if (!storedUser) {
      return null;
    }

    const userDiscordData = await this.discordService.getUserInfo(storedUser.accessToken);

    return new User({
      id,
      username: userDiscordData.username,
      globalName: userDiscordData.global_name,
      email: userDiscordData.email,
      avatar: userDiscordData.avatar,
      role: storedUser.role,
      auth: storedUser,
    });
  }

  async upsert(tokenInfo: ExchangeCodeForTokenResponse) {
    const userInfo = await this.discordService.getUserInfo(tokenInfo.access_token);

    let storedUser: StoredUser;

    const userAlreadyStored = await this.storedUsersRepository.exists(userInfo.id);
    if (userAlreadyStored) {
      storedUser = await this.storedUsersRepository.update(userInfo.id, {
        accessToken: tokenInfo.access_token,
        refreshToken: tokenInfo.refresh_token,
        expiresIn: tokenInfo.expires_in,
      });
    } else {
      storedUser = await this.storedUsersRepository.create({
        discordUserId: userInfo.id,
        accessToken: tokenInfo.access_token,
        refreshToken: tokenInfo.refresh_token,
        expiresIn: tokenInfo.expires_in,
      });
    }

    const user = new User({
      id: storedUser.id,
      username: userInfo.username,
      globalName: userInfo.global_name,
      email: userInfo.email,
      avatar: userInfo.avatar,
      role: storedUser.role,
      auth: storedUser,
    });

    return user;
  }
}
