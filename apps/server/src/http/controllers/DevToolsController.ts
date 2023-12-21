import {
  GenerateAccessTokenResponse,
  GetDiscordUserInfoResponse,
  generateAccessTokenBodyRequest,
  getDiscordUserInfoHeadersRequest,
  getDiscordUserInfoParamsRequest,
} from '@tardis-enquete/contracts';
import { Request, Response } from 'express';

import Forbidden from '../../domain/errors/Forbidden';
import GenerateAccessTokenUseCase from '../../domain/useCases/devTools/GenerateAccessTokenUseCase';
import GetDiscordUserInfoUseCase from '../../domain/useCases/devTools/GetDiscordUserInfoUseCase';

export default class DevToolsController {
  constructor(
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly getDiscordUserInfoUseCase: GetDiscordUserInfoUseCase,
  ) {}

  async generateAccessToken(req: Request, res: Response) {
    if (process.env.NODE_ENV !== 'development') {
      throw new Forbidden();
    }

    const { discordUserId, role, expiresIn } = generateAccessTokenBodyRequest.parse(req.body);

    const token = await this.generateAccessTokenUseCase.execute({
      userId: discordUserId,
      role,
      expiresIn,
    });

    const response: GenerateAccessTokenResponse = {
      token,
    };

    return res.status(201).json(response);
  }

  async getDiscordUserInfo(req: Request, res: Response) {
    const { discordUserId } = getDiscordUserInfoParamsRequest.parse(req.params);
    const headersParsed = getDiscordUserInfoHeadersRequest.parse(req.headers);

    const headers = {
      ...req.headers,
      ...headersParsed,
    };

    const discordToken = headers['x-discord-token'];

    const discordUserInfo = await this.getDiscordUserInfoUseCase.execute({
      userId: discordUserId,
      discordToken,
    });

    const response: GetDiscordUserInfoResponse = discordUserInfo;

    return res.json(response);
  }
}
