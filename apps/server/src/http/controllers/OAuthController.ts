import {
  GetDiscordOAuthURLResponse,
  VerifyTokenResponse,
  cookieKeys,
  discordCallbackQueryRequest,
  verifyTokenQueryRequest,
} from '@tardis-enquete/contracts';
import chalk from 'chalk';
import { Request, Response } from 'express';
import { ZodError } from 'zod';

import InternalServerError from '../../domain/errors/InternalServerError';
import Unauthorized from '../../domain/errors/Unauthorized';
import DiscordService from '../../services/DiscordService';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import { getClientURLInRequest } from '../../utils/getClientURLInRequest';
import { getHostURLInRequest } from '../../utils/getHostURLInRequest';

export default class OAuthController {
  constructor(
    private readonly userService: UserService,
    private readonly discordService: DiscordService,
    private readonly tokenService: TokenService,
  ) {}

  async getDiscordOAuthURL(req: Request, res: Response) {
    const redirectBaseURL = getHostURLInRequest(req);

    const url = this.discordService.getConsentOAuthURL(redirectBaseURL);

    const response: GetDiscordOAuthURLResponse = {
      redirectURL: url,
    };

    return res.json(response);
  }

  async handleDiscordCallback(req: Request, res: Response) {
    try {
      const { code } = discordCallbackQueryRequest.parse(req.query);

      const redirectBaseURL = getHostURLInRequest(req);
      const clientBaseURL = getClientURLInRequest(req);

      const tokenInfo = await this.discordService.exchangeCodeForToken(code, redirectBaseURL);

      const user = await this.userService.upsert(tokenInfo);

      const token = await this.tokenService.sign('access', { role: user.role, sub: user.id });

      res.cookie(cookieKeys.accessToken, token, { httpOnly: true, secure: true });

      return res.redirect(`${clientBaseURL}/`);
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

  async verifyToken(req: Request, res: Response) {
    const { t: token } = verifyTokenQueryRequest.parse(req.query);

    const { status, payload } = await this.tokenService.verify('access', token);

    if (status === 'expired') {
      throw new Unauthorized('Não autenticado: sua sessão expirou.');
    }

    if (status === 'invalid' || status !== 'valid') {
      throw new Unauthorized('Não autenticado: informações inválidas.');
    }

    if (payload.development && process.env.NODE_ENV !== 'development') {
      throw new Unauthorized();
    }

    const { sub: userId } = payload;

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Unauthorized('Usuário não encontrado');
    }

    const userObject = user.toObject();

    // @ts-expect-error
    delete userObject.auth;

    const response: VerifyTokenResponse = {
      user: userObject,
    };

    return res.json(response);
  }
}
