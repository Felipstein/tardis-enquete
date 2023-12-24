import UnvoteUseCase from '../../../domain/useCases/votes/UnvoteUseCase';
import VoteUseCase from '../../../domain/useCases/votes/VoteUseCase';
import {
  factoryOptionsRepository,
  factoryPollsRepository,
  factoryStoredUsersRepository,
  factoryVotesRepository,
} from '../repositories';

const voteUseCase = new VoteUseCase(
  factoryVotesRepository(),
  factoryOptionsRepository(),
  factoryPollsRepository(),
  factoryStoredUsersRepository(),
);

export function factoryVoteUseCase() {
  return voteUseCase;
}

const unvoteUseCase = new UnvoteUseCase(factoryVotesRepository(), factoryPollsRepository());

export function factoryUnvoteUseCase() {
  return unvoteUseCase;
}
