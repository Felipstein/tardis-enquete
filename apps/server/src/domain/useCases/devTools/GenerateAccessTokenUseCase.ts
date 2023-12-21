import TokenService from '../../../services/TokenService';

import { GenerateAccessTokenUseCaseDTO } from './GenerateAccessTokenUseCaseDTO';

export default class GenerateAccessTokenUseCase {
  constructor(private readonly tokenService: TokenService) {}

  async execute({ userId, role, expiresIn }: GenerateAccessTokenUseCaseDTO) {
    const token = await this.tokenService.sign('access', { sub: userId, role }, { expiresIn, developmentMode: true });

    return token;
  }
}
