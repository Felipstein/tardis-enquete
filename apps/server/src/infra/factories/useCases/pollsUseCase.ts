import ChangePollClosedStatusUseCase from '../../../domain/useCases/polls/ChangePollClosedStatusUseCase';
import CreatePollUseCase from '../../../domain/useCases/polls/CreatePollUseCase';
import DeletePollUseCase from '../../../domain/useCases/polls/DeletePollUseCase';
import FindPollByIdUseCase from '../../../domain/useCases/polls/FindPollByIdUseCase';
import FindPollsUseCase from '../../../domain/useCases/polls/FindPollsUseCase';
import UpdatePollUseCase from '../../../domain/useCases/polls/UpdatePollUseCase';
import { factoryPrismaClient } from '../prismaClient';
import { factoryPollsRepository, factoryStoredUsersRepository } from '../repositories';
import { factoryPolulatePollService, factoryUserService } from '../services';

const findPollsUseCase = new FindPollsUseCase(factoryPollsRepository(), factoryPolulatePollService());

export function factoryFindPollsUseCase() {
  return findPollsUseCase;
}

const findPollByIdUseCase = new FindPollByIdUseCase(factoryPollsRepository(), factoryUserService());

export function factoryFindPollByIdUseCase() {
  return findPollByIdUseCase;
}

const createPollUseCase = new CreatePollUseCase(
  factoryPollsRepository(),
  factoryStoredUsersRepository(),
  factoryUserService(),
  factoryPolulatePollService(),
);

export function factoryCreatePollUseCase() {
  return createPollUseCase;
}

const updatePollUseCase = new UpdatePollUseCase(
  factoryPollsRepository(),
  factoryUserService(),
  factoryPolulatePollService(),
  factoryPrismaClient(),
);

export function factoryUpdatePollUseCase() {
  return updatePollUseCase;
}

const changePollClosedStatusUseCase = new ChangePollClosedStatusUseCase(
  factoryUpdatePollUseCase(),
  factoryPrismaClient(),
);

export function factoryChangePollClosedStatusUseCase() {
  return changePollClosedStatusUseCase;
}

const deletePollUseCase = new DeletePollUseCase(factoryPollsRepository());

export function factoryDeletePollUseCase() {
  return deletePollUseCase;
}
