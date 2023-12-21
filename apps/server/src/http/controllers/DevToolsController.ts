import {
  GenerateAccessTokenResponse,
  GetDiscordUserInfoResponse,
  generateAccessTokenBodyRequest,
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
    const { discordToken } = getDiscordUserInfoParamsRequest.parse(req.params);

    const discordUserInfo = await this.getDiscordUserInfoUseCase.execute({
      discordToken,
    });

    const response: GetDiscordUserInfoResponse = discordUserInfo;

    return res.json(response);
  }
}
