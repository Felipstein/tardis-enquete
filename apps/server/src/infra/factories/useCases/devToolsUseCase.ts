import GenerateAccessTokenUseCase from '../../../domain/useCases/devTools/GenerateAccessTokenUseCase';
import { factoryTokenService } from '../services';

const generateAccessTokenUseCase = new GenerateAccessTokenUseCase(factoryTokenService());

export function factoryGenerateAccessTokenUseCase() {
  return generateAccessTokenUseCase;
}
