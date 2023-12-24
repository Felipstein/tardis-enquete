import moment from 'moment';

import MockPollsRepository from '../../../../__tests__/mocks/MockPollsRepository';
import MockVotesRepository from '../../../../__tests__/mocks/MockVotesRepository';
import Poll from '../../entities/Poll';
import Vote from '../../entities/Vote';
import Forbidden from '../../errors/Forbidden';
import PollAlreadyExpired from '../../errors/PollAlreadyExpired';
import VoteNotExists from '../../errors/VoteNotExists';

import UnvoteUseCase from './UnvoteUseCase';
import { UnvoteDTO } from './UnvoteUseCaseDTO';

describe('UnvoteUseCase', () => {
  let votesRepository: MockVotesRepository;
  let pollsRepository: MockPollsRepository;

  let useCase: UnvoteUseCase;

  beforeEach(() => {
    votesRepository = new MockVotesRepository();
    pollsRepository = new MockPollsRepository();

    useCase = new UnvoteUseCase(votesRepository, pollsRepository);
  });

  it('should unvote successfully', async () => {
    const userId = 'fake-user-id';
    const voteId = 'fake-vote-id';

    const unvoteData: UnvoteDTO = {
      userId,
      voteId,
      onlySameUserCanUnvote: true,
    };

    const vote = new Vote({
      id: voteId,
      userId,
      optionId: 'fake-option-id',
    });

    const poll = new Poll({
      id: 'fake-poll-id',
      authorId: 'fake-author-id',
      createdAt: new Date(),
      expireAt: moment(new Date()).add(1, 'day').toDate(),
      title: 'Test Poll',
      description: 'Test Poll Description',
    });

    votesRepository.findById.mockResolvedValue(vote);

    pollsRepository.findPollThatContainsOption.mockResolvedValue(poll);

    await expect(useCase.execute(unvoteData)).resolves.not.toThrow();
  });

  it('should throw error when unvote that the vote does not exist', async () => {
    const unvoteData: UnvoteDTO = {
      userId: 'fake-user-id',
      voteId: 'fake-vote-id',
      onlySameUserCanUnvote: true,
    };

    const poll = new Poll({
      id: 'fake-poll-id',
      authorId: 'fake-author-id',
      createdAt: new Date(),
      expireAt: moment(new Date()).add(1, 'day').toDate(),
      title: 'Test Poll',
      description: 'Test Poll Description',
    });

    votesRepository.findById.mockResolvedValue(null);

    pollsRepository.findPollThatContainsOption.mockResolvedValue(poll);

    await expect(useCase.execute(unvoteData)).rejects.toThrow(VoteNotExists);
  });

  it('should throw error when unvote that the poll are expired', async () => {
    const userId = 'fake-user-id';
    const voteId = 'fake-vote-id';
    const optionId = 'fake-option-id';

    const unvoteData: UnvoteDTO = {
      userId,
      voteId,
      onlySameUserCanUnvote: true,
    };

    const vote = new Vote({
      id: voteId,
      userId,
      optionId,
    });

    const poll = new Poll({
      id: 'fake-poll-id',
      authorId: 'fake-author-id',
      createdAt: moment(new Date()).subtract(2, 'day').toDate(),
      expireAt: moment(new Date()).subtract(1, 'day').toDate(),
      title: 'Test Poll',
      description: 'Test Poll Description',
    });

    votesRepository.findById.mockResolvedValue(vote);

    pollsRepository.findPollThatContainsOption.mockResolvedValue(poll);

    await expect(useCase.execute(unvoteData)).rejects.toThrow(PollAlreadyExpired);
  });

  it('should throw error when unvote that the user is not the same user that voted', async () => {
    const userIdThatVoted = 'fake-user-id-1';
    const userIdThatWasUnvote = 'fake-user-id-2';
    const voteId = 'fake-vote-id';

    const unvoteData: UnvoteDTO = {
      userId: userIdThatWasUnvote,
      voteId,
      onlySameUserCanUnvote: true,
    };

    const vote = new Vote({
      id: voteId,
      userId: userIdThatVoted,
      optionId: 'fake-option-id',
    });

    const poll = new Poll({
      id: 'fake-poll-id',
      authorId: 'fake-author-id',
      createdAt: new Date(),
      expireAt: moment(new Date()).add(1, 'day').toDate(),
      title: 'Test Poll',
      description: 'Test Poll Description',
    });

    votesRepository.findById.mockResolvedValue(vote);

    pollsRepository.findPollThatContainsOption.mockResolvedValue(poll);

    await expect(useCase.execute(unvoteData)).rejects.toThrow(Forbidden);
  });
});
