import MockOptionsRepository from '../../../../__tests__/mocks/MockOptionsRepository';
import MockPollsRepository from '../../../../__tests__/mocks/MockPollsRepository';
import MockStoredUsersRepository from '../../../../__tests__/mocks/MockStoredUsersRepository';
import MockVotesRepository from '../../../../__tests__/mocks/MockVotesRepository';
import DiscordService from '../../../services/DiscordService';
import PopulatePollService from '../../../services/PopulatePollService';
import UserService from '../../../services/UserService';
import Conflict from '../../errors/Conflict';
import PollAlreadyExpired from '../../errors/PollAlreadyExpired';
import PollNotExists from '../../errors/PollNotExists';
import StoredUserNotExists from '../../errors/StoredUserNotExists';

import VoteUseCase from './VoteUseCase';
import { VoteDTO } from './VoteUseCaseDTO';

describe('VoteUseCase', () => {
  let votesRepository: MockVotesRepository;
  let optionsRepository: MockOptionsRepository;
  let pollsRepository: MockPollsRepository;
  let storedUsersRepository: MockStoredUsersRepository;
  let populatePollService: PopulatePollService;
  let discordService: DiscordService;
  let userService: UserService;

  let useCase: VoteUseCase;

  beforeEach(() => {
    votesRepository = new MockVotesRepository();
    optionsRepository = new MockOptionsRepository();
    pollsRepository = new MockPollsRepository();
    storedUsersRepository = new MockStoredUsersRepository();
    discordService = new DiscordService();
    userService = new UserService(storedUsersRepository, discordService);
    populatePollService = new PopulatePollService(pollsRepository, userService);

    useCase = new VoteUseCase(
      votesRepository,
      optionsRepository,
      pollsRepository,
      storedUsersRepository,
      populatePollService,
    );
  });

  it('should vote successfully', async () => {
    const optionId = 'fake-option-id';
    const userId = 'fake-user-id';

    const voteData: VoteDTO = {
      userId,
      optionId,
    };

    const poll = {
      isExpired: () => false,
    };

    pollsRepository.findPollThatContainsOption.mockResolvedValue(poll);

    storedUsersRepository.exists.mockResolvedValue(true);

    votesRepository.existsByUserAndOption.mockResolvedValue(false);

    await expect(useCase.execute(voteData)).resolves.not.toThrow();
  });

  it('should throw error if poll not exists', async () => {
    const optionId = 'fake-option-id';
    const userId = 'fake-user-id';

    const voteData: VoteDTO = {
      userId,
      optionId,
    };

    pollsRepository.findPollThatContainsOption.mockResolvedValue(null);

    await expect(useCase.execute(voteData)).rejects.toThrow(PollNotExists);
  });

  it('should throw error if vote in poll that is expired', async () => {
    const optionId = 'fake-option-id';
    const userId = 'fake-user-id';

    const voteData: VoteDTO = {
      userId,
      optionId,
    };

    const pollExpired = {
      isExpired: () => true,
    };

    pollsRepository.findPollThatContainsOption.mockResolvedValue(pollExpired);

    await expect(useCase.execute(voteData)).rejects.toThrow(PollAlreadyExpired);
  });

  it('should throw error if vote by user that not exists', async () => {
    const optionId = 'fake-option-id';
    const userId = 'fake-user-id';

    const voteData: VoteDTO = {
      userId,
      optionId,
    };

    const poll = {
      isExpired: () => false,
    };

    pollsRepository.findPollThatContainsOption.mockResolvedValue(poll);

    storedUsersRepository.exists.mockResolvedValue(false);

    votesRepository.existsByUserAndOption.mockResolvedValue(false);

    await expect(useCase.execute(voteData)).rejects.toThrow(StoredUserNotExists);
  });

  it('should throw error if vote that already voted in the same option', async () => {
    const optionId = 'fake-option-id';
    const userId = 'fake-user-id';

    const voteData: VoteDTO = {
      userId,
      optionId,
    };

    const poll = {
      isExpired: () => false,
    };

    pollsRepository.findPollThatContainsOption.mockResolvedValue(poll);

    storedUsersRepository.exists.mockResolvedValue(true);

    votesRepository.existsByUserAndOption.mockResolvedValue(true);

    await expect(useCase.execute(voteData)).rejects.toThrow(Conflict);
  });
});
