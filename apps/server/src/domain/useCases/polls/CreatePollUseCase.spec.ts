import moment from 'moment';

import MockPollsRepository from '../../../../__tests__/mocks/MockPollsRepository';
import Poll from '../../entities/Poll';
import BadRequest from '../../errors/BadRequest';

import CreatePollUseCase from './CreatePollUseCase';
import { CreatePollUseCaseDTO } from './CreatePollUseCaseDTO';

describe('CreatePollUseCase', () => {
  let mockPollsRepository: MockPollsRepository;
  let useCase: CreatePollUseCase;

  beforeEach(() => {
    mockPollsRepository = new MockPollsRepository();

    useCase = new CreatePollUseCase(mockPollsRepository);
  });

  it('should create a poll successfully', async () => {
    const pollData: CreatePollUseCaseDTO = {
      title: 'Test Poll',
      description: 'Test Poll Description',
      expireAt: moment(new Date()).add(1, 'day').toDate(),
      authorId: 'fake-author-id',
    };

    const expectedPoll = new Poll({
      id: 'fake-poll-id',
      ...pollData,
      createdAt: new Date(),
    });

    mockPollsRepository.create.mockResolvedValue(expectedPoll);

    const result = await useCase.execute(pollData);

    expect(result).toEqual(expectedPoll);
  });

  it('should throw an error when create poll that expired at date is in the past', async () => {
    const pollData: CreatePollUseCaseDTO = {
      title: 'Test Poll',
      description: 'Test Poll Description',
      expireAt: moment(new Date()).subtract(1, 'hour').toDate(),
      authorId: 'fake-author-id',
    };

    await expect(useCase.execute(pollData)).rejects.toThrow(BadRequest);
  });
});
