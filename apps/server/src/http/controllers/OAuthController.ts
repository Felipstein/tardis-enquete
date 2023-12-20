import chalk from 'chalk';
import { Request, Response } from 'express';

import StoredUser from '../../domain/entities/StoredUser';
import User from '../../domain/entities/User';
import InternalServerError from '../../domain/errors/InternalServerError';
import IStoredUsersRepository from '../../domain/repositories/StoredUsersStoredRepository';
import DiscordService from '../../services/DiscordService';
import { getHostURLInRequest } from '../../utils/getHostURLInRequest';

import { handleDiscordCallbackQueryRequest } from './OAuthValidations';

export default class OAuthController {
  constructor(
    private readonly discordService: DiscordService,
    private readonly storedUsersRepository: IStoredUsersRepository,
  ) {}

  async redirectToDiscordOAuthURL(req: Request, res: Response) {
    const redirectBaseURL = getHostURLInRequest(req);

    const url = this.discordService.getConsentOAuthURL(redirectBaseURL);

    return res.redirect(url);
  }

  async handleDiscordCallback(req: Request, res: Response) {
    try {
      const { code } = handleDiscordCallbackQueryRequest.parse(req.query);

      const redirectBaseURL = getHostURLInRequest(req);

      const tokenInfo = await this.discordService.exchangeCodeForToken(code, redirectBaseURL);

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

      return res.json(user.toObject());
    } catch (error: unknown) {
      let errorInstance: Error;

      if (error instanceof Error) {
        errorInstance = error;
      } else if (typeof error === 'string') {
        errorInstance = new Error(error);
      } else {
        errorInstance = new Error('Erro desconhecido');
      }

      console.error(chalk.red('An error occorrured in Discord OAuth Callback Handler:', errorInstance.message));

      throw new InternalServerError(
        'Ocorreu um erro na finalização da sua autenticação com o Discord',
        500,
        errorInstance,
      );
    }
  }
}
