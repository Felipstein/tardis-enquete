import IPollsRepository from '../../domain/repositories/PollsRepository';
import IStoredUsersRepository from '../../domain/repositories/StoredUsersStoredRepository';
import PrismaPollsRepository from '../repositories/polls/PrismaPollsRepository';
import PrismaStoredUsersRepository from '../repositories/storedUsers/PrismaStoredUsersRepository';

import { factoryPrismaClient } from './prismaClient';

const storedUsersRepository: IStoredUsersRepository = new PrismaStoredUsersRepository(factoryPrismaClient());

export function factoryStoredUsersRepository() {
  return storedUsersRepository;
}

const pollsRepository: IPollsRepository = new PrismaPollsRepository(factoryPrismaClient());

export function factoryPollsRepository() {
  return pollsRepository;
}
