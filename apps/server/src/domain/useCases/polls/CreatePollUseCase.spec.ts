import moment from 'moment';

import MockPollsRepository from '../../../../__tests__/mocks/MockPollsRepository';
import MockStoredUsersRepository from '../../../../__tests__/mocks/MockStoredUsersRepository';
import Poll from '../../entities/Poll';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import UnprocessableEntity from '../../errors/UnprocessableEntity';

import CreatePollUseCase from './CreatePollUseCase';
import { CreatePollUseCaseDTO } from './CreatePollUseCaseDTO';

describe('CreatePollUseCase', () => {
  let mockPollsRepository: MockPollsRepository;
  let mockStoredUsersRepository: MockStoredUsersRepository;
  let useCase: CreatePollUseCase;

  beforeEach(() => {
    mockPollsRepository = new MockPollsRepository();
    mockStoredUsersRepository = new MockStoredUsersRepository();

    useCase = new CreatePollUseCase(mockPollsRepository, mockStoredUsersRepository);
  });

  it('should create a poll successfully', async () => {
    const pollData: CreatePollUseCaseDTO = {
      title: 'Test Poll',
      description: 'Test Poll Description',
      expireAt: moment(new Date()).add(1, 'day').toDate(),
      authorId: 'fake-author-id',
      options: ['Option 1', 'Option 2'],
    };

    const expectedPoll = new Poll({
      id: 'fake-poll-id',
      ...pollData,
      createdAt: new Date(),
    });

    mockPollsRepository.create.mockResolvedValue(expectedPoll);
    mockStoredUsersRepository.exists.mockResolvedValue(true);

    const result = await useCase.execute(pollData);

    expect(result).toEqual(expectedPoll);
  });

  it('should throw an error when create poll that expired at date is in the past', async () => {
    const pollData: CreatePollUseCaseDTO = {
      title: 'Test Poll',
      description: 'Test Poll Description',
      expireAt: moment(new Date()).subtract(1, 'hour').toDate(),
      authorId: 'fake-author-id',
      options: ['Option 1', 'Option 2'],
    };

    mockStoredUsersRepository.exists.mockResolvedValue(true);

    await expect(useCase.execute(pollData)).rejects.toThrow(UnprocessableEntity);
  });

  it('should throw an error when author does not exist', async () => {
    const pollData: CreatePollUseCaseDTO = {
      title: 'Test Poll',
      description: 'Test Poll Description',
      expireAt: moment(new Date()).add(1, 'day').toDate(),
      authorId: 'fake-author-id',
      options: ['Option 1', 'Option 2'],
    };

    mockStoredUsersRepository.exists.mockResolvedValue(false);

    await expect(useCase.execute(pollData)).rejects.toThrow(StoredUserNotExists);
  });
});
