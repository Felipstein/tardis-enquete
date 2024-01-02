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
import Logger from '../../infra/logger';
import DiscordService from '../../services/DiscordService';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import { getClientURLInRequest } from '../../utils/getClientURLInRequest';
import { getHostURLInRequest } from '../../utils/getHostURLInRequest';
import { origin } from '../../utils/getOriginDomain';

const log = Logger.start('OAUTH CONTROLLER');

export default class OAuthController {
  constructor(
    private readonly userService: UserService,
    private readonly discordService: DiscordService,
    private readonly tokenService: TokenService,
  ) {}

  async getDiscordOAuthURL(req: Request, res: Response) {
    const redirectBaseURL = getHostURLInRequest(req);

    log.verbose.info('Getting Discord OAuth URL');

    const url = this.discordService.getConsentOAuthURL(redirectBaseURL);

    log.verbose.success('URL:', url);

    const response: GetDiscordOAuthURLResponse = {
      redirectURL: url,
    };

    return res.json(response);
  }

  // Terás que setar withCredentials no frontend para o cookie ser setado com êxito, o useja, não é por meio de redirect que as coisas vao funcioanr
  async handleDiscordCallback(req: Request, res: Response) {
    try {
      log.verbose.info('Discord Callback Handler');

      const { code } = discordCallbackQueryRequest.parse(req.query);

      log.verbose.info('Code parsed:', code);

      const redirectBaseURL = getHostURLInRequest(req);
      const clientBaseURL = getClientURLInRequest(req);

      log.verbose.info('Redirect Base URL:', redirectBaseURL);
      log.verbose.info('Client Base URL:', clientBaseURL);

      const tokenInfo = await this.discordService.exchangeCodeForToken(code, redirectBaseURL);

      log.verbose.success('Code exchanged per token successfully:', tokenInfo);

      const user = await this.userService.upsert(tokenInfo);

      log.verbose.success('User updated/created.');
      log.verbose.success('User info:', user);

      const token = await this.tokenService.sign('access', { role: user.role, sub: user.id });

      log.verbose.success('Token signed:', token);
      log.verbose.success('Token payload:', { role: user.role, sub: user.id });

      const { domain: originDomain } = origin();

      res.cookie(cookieKeys.accessToken, token, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        path: '/',
        domain: originDomain,
      });

      log.verbose.success(`Token setted in cookie and redirecting the request to ${clientBaseURL}/`);

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
