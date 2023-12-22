import IStoredUsersRepository from '../../src/domain/repositories/StoredUsersStoredRepository';

export default class MockStoredUsersRepository implements IStoredUsersRepository {
  exists = jest.fn();

  findById = jest.fn();

  create = jest.fn();

  update = jest.fn();

  updateByInstance = jest.fn();

  delete = jest.fn();
}
