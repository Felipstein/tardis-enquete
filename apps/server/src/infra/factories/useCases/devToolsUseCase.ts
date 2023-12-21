import GenerateAccessTokenUseCase from '../../../domain/useCases/devTools/GenerateAccessTokenUseCase';
import GetDiscordUserInfoUseCase from '../../../domain/useCases/devTools/GetDiscordUserInfoUseCase';
import { factoryDiscordService, factoryTokenService } from '../services';

const generateAccessTokenUseCase = new GenerateAccessTokenUseCase(factoryTokenService());

export function factoryGenerateAccessTokenUseCase() {
  return generateAccessTokenUseCase;
}

const getDiscordUserInfoUseCase = new GetDiscordUserInfoUseCase(factoryDiscordService());

export function factoryGetDiscordUserInfoUseCase() {
  return getDiscordUserInfoUseCase;
}
