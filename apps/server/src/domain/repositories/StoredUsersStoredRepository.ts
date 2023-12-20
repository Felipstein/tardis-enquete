import StoredUser from '../entities/StoredUser';

import { CreateStoredUserDTO, UpdateStoredUserDTO } from './StoredUsersRepositoryDTO';

export default interface IStoredUsersRepository {
  exists(id: string): Promise<boolean>;

  findById(id: string): Promise<StoredUser | null>;

  create(data: CreateStoredUserDTO): Promise<StoredUser>;

  update(id: string, data: UpdateStoredUserDTO): Promise<StoredUser>;

  updateByInstance(data: StoredUser): Promise<void>;

  delete(id: string): Promise<void>;
}
