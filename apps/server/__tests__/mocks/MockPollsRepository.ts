import IPollsRepository from '../../src/domain/repositories/PollsRepository';

export default class MockPollsRepository implements IPollsRepository {
  exists = jest.fn();

  findAllWithOptionsAndVotes = jest.fn();

  create = jest.fn();

  update = jest.fn();

  updateByInstance = jest.fn();

  delete = jest.fn();
}
