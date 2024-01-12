import IOptionsRepository from '../../src/domain/repositories/OptionsRepository';

export default class MockOptionsRepository implements IOptionsRepository {
  findOptionsOfPoll = jest.fn();

  findOptionsVotedByUserInPoll = jest.fn();

  findOptionVotedByUserInPoll = jest.fn();

  findById = jest.fn();

  createMany = jest.fn();

  deleteOptionsOfPoll = jest.fn();
}
