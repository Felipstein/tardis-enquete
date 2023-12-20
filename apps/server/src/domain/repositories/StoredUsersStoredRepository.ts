import StoredUser from '../entities/StoredUser';

import { CreateStoredUserDTO } from './StoredUsersRepositoryDTO';

export default interface IStoredUsersRepository {
  exists(id: string): Promise<boolean>;

  findById(id: string): Promise<StoredUser | null>;

  create(data: CreateStoredUserDTO): Promise<StoredUser>;

  update(data: StoredUser): Promise<void>;

  delete(id: string): Promise<void>;
}
