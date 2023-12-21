import CreatePollUseCase from '../../../domain/useCases/polls/CreatePollUseCase';
import { factoryPollsRepository } from '../repositories';

const createPollUseCase = new CreatePollUseCase(factoryPollsRepository());

export function factoryCreatePollUseCase() {
  return createPollUseCase;
}
