import CreatePollUseCase from '../../../domain/useCases/polls/CreatePollUseCase';
import FindPollsUseCase from '../../../domain/useCases/polls/FindPollsUseCase';
import { factoryPollsRepository, factoryStoredUsersRepository } from '../repositories';
import { factoryUserService } from '../services';

const findPollsUseCase = new FindPollsUseCase(factoryPollsRepository(), factoryUserService());

export function factoryFindPollsUseCase() {
  return findPollsUseCase;
}

const createPollUseCase = new CreatePollUseCase(factoryPollsRepository(), factoryStoredUsersRepository());

export function factoryCreatePollUseCase() {
  return createPollUseCase;
}
