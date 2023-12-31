import IVotesRepository from '../../src/domain/repositories/VotesRepository';

export default class MockVotesRepository implements IVotesRepository {
  existsByUserAndOption = jest.fn();

  findById = jest.fn();

  findByOptionId = jest.fn();

  create = jest.fn();

  delete = jest.fn();
}
