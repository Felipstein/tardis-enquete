import CreatePollUseCase from '../../../domain/useCases/polls/CreatePollUseCase';
import DeletePollUseCase from '../../../domain/useCases/polls/DeletePollUseCase';
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

const deletePollUseCase = new DeletePollUseCase(factoryPollsRepository());

export function factoryDeletePollUseCase() {
  return deletePollUseCase;
}
