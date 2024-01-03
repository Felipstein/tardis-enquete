import UnvoteUseCase from '../../../domain/useCases/votes/UnvoteUseCase';
import VoteUseCase from '../../../domain/useCases/votes/VoteUseCase';
import {
  factoryOptionsRepository,
  factoryPollsRepository,
  factoryStoredUsersRepository,
  factoryVotesRepository,
} from '../repositories';
import { factoryPolulatePollService } from '../services';

const voteUseCase = new VoteUseCase(
  factoryVotesRepository(),
  factoryOptionsRepository(),
  factoryPollsRepository(),
  factoryStoredUsersRepository(),
  factoryPolulatePollService(),
);

export function factoryVoteUseCase() {
  return voteUseCase;
}

const unvoteUseCase = new UnvoteUseCase(
  factoryVotesRepository(),
  factoryPollsRepository(),
  factoryPolulatePollService(),
);

export function factoryUnvoteUseCase() {
  return unvoteUseCase;
}
