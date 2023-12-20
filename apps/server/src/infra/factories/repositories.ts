import IStoredUsersRepository from '../../domain/repositories/StoredUsersStoredRepository';
import PrismaStoredUsersRepository from '../repositories/storedUsers/PrismaStoredUsersRepository';

import { factoryPrismaClient } from './prismaClient';

const storedUsersRepository: IStoredUsersRepository = new PrismaStoredUsersRepository(factoryPrismaClient());

export function factoryStoredUsersRepository() {
  return storedUsersRepository;
}
