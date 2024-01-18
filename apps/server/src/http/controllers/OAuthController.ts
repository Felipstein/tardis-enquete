import {
  GetDiscordOAuthURLResponse,
  VerifyTokenResponse,
  discordCallbackQueryRequest,
  verifyTokenQueryRequest,
  DiscordCallbackResponse,
} from '@tardis-enquete/contracts';
import chalk from 'chalk';
import { Request, Response } from 'express';
import { ZodError } from 'zod';

import InternalServerError from '../../domain/errors/InternalServerError';
import Unauthorized from '../../domain/errors/Unauthorized';
import Logger from '../../infra/logger';
import DiscordService from '../../services/DiscordService';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import { getClientURLInRequest } from '../../utils/getClientURLInRequest';

const log = Logger.start('OAUTH CONTROLLER');

export default class OAuthController {
  private readonly OAUTH_CALLBACK_ENDPOINT = '/api/auth/callback';

  constructor(
    private readonly userService: UserService,
    private readonly discordService: DiscordService,
    private readonly tokenService: TokenService,
  ) {}

  async getDiscordOAuthURL(req: Request, res: Response) {
    const redirectBaseURL = getClientURLInRequest(req);
    const redirectURI = `${redirectBaseURL}${this.OAUTH_CALLBACK_ENDPOINT}`;

    log.verbose.info('Getting Discord OAuth URL');
    log.verbose.info('Redirect Base URL:', redirectBaseURL);
    log.verbose.info('Redirect URI:', redirectURI);

    const url = this.discordService.getConsentOAuthURL(redirectURI);

    log.verbose.success('URL:', url);

    const response: GetDiscordOAuthURLResponse = {
      redirectURL: url,
    };

    return res.json(response);
  }

  async handleDiscordCallback(req: Request, res: Response) {
    try {
      log.verbose.info('Discord Callback Handler');

      const { code } = discordCallbackQueryRequest.parse(req.query);

      log.verbose.info('Code parsed:', code);

      const redirectBaseURL = getClientURLInRequest(req);

      const redirectURI = `${redirectBaseURL}${this.OAUTH_CALLBACK_ENDPOINT}`;

      log.verbose.info('Redirect Base URL:', redirectBaseURL);
      log.verbose.info('Redirect URI:', redirectURI);

      const tokenInfo = await this.discordService.exchangeCodeForToken(code, redirectURI);

      log.verbose.success('Code exchanged per token successfully:', tokenInfo);

      const user = await this.userService.upsert(tokenInfo);

      log.success('User updated/created.');
      log.success('User info:', JSON.stringify(user.toObject(), null, 2));

      const token = await this.tokenService.sign('access', { role: user.role, sub: user.id });

      log.verbose.success('Token signed:', token);
      log.verbose.success('Token payload:', { role: user.role, sub: user.id });

      const response: DiscordCallbackResponse = {
        accessToken: token,
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

      log.error(chalk.red('An error occorrured in Discord OAuth Callback Handler:', errorInstance.message));

      throw new InternalServerError(
        'Ocorreu um erro na finalização da sua autenticação com o Discord',
        500,
        errorInstance,
      );
    }
  }

  async verifyToken(req: Request, res: Response) {
    log.verbose.info('Verify Token');

    const { t: token } = verifyTokenQueryRequest.parse(req.query);

    log.verbose.info('Token parsed:', token);

    const { status, payload } = await this.tokenService.verify('access', token);

    log.verbose.info('Token status:', status);
    log.verbose.info('Token payload:', payload);

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

    log.verbose.success('User of token found.');
    log.verbose.success('User ID:', user.id);
    log.verbose.success('Username:', user.username);
    log.verbose.success('User global name:', user.globalName);

    const userObject = user.toObject();

    const response: VerifyTokenResponse = {
      user: {
        ...userObject,
        // @ts-expect-error
        auth: undefined,
      },
    };

    return res.json(response);
  }
}
