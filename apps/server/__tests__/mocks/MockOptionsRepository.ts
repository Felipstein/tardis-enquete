import IOptionsRepository from '../../src/domain/repositories/OptionsRepository';

export default class MockOptionsRepository implements IOptionsRepository {
  findOptionsVotedByUserInPoll = jest.fn();

  findOptionVotedByUserInPoll = jest.fn();

  findById = jest.fn();
}
