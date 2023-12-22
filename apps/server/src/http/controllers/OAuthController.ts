import { DiscordCallbackResponse, discordCallbackQueryRequest } from '@tardis-enquete/contracts';
import chalk from 'chalk';
import { Request, Response } from 'express';
import { ZodError } from 'zod';

import InternalServerError from '../../domain/errors/InternalServerError';
import DiscordService from '../../services/DiscordService';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import { getHostURLInRequest } from '../../utils/getHostURLInRequest';

export default class OAuthController {
  constructor(
    private readonly userService: UserService,
    private readonly discordService: DiscordService,
    private readonly tokenService: TokenService,
  ) {}

  async redirectToDiscordOAuthURL(req: Request, res: Response) {
    const redirectBaseURL = getHostURLInRequest(req);

    const url = this.discordService.getConsentOAuthURL(redirectBaseURL);

    return res.redirect(url);
  }

  async handleDiscordCallback(req: Request, res: Response) {
    try {
      const { code } = discordCallbackQueryRequest.parse(req.query);

      const redirectBaseURL = getHostURLInRequest(req);

      const tokenInfo = await this.discordService.exchangeCodeForToken(code, redirectBaseURL);

      const user = await this.userService.upsert(tokenInfo);

      const token = await this.tokenService.sign('access', { role: user.role, sub: user.id });

      const response: DiscordCallbackResponse = {
        user: user.toObject(),
        token,
      };

      return res.json(response);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        throw error;
      }

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
