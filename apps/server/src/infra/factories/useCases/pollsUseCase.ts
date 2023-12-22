import CreatePollUseCase from '../../../domain/useCases/polls/CreatePollUseCase';
import { factoryPollsRepository, factoryStoredUsersRepository } from '../repositories';

const createPollUseCase = new CreatePollUseCase(factoryPollsRepository(), factoryStoredUsersRepository());

export function factoryCreatePollUseCase() {
  return createPollUseCase;
}
