import IFeedbacksRepository from '../../domain/repositories/FeedbacksRepository';
import IOptionsRepository from '../../domain/repositories/OptionsRepository';
import IPollsRepository from '../../domain/repositories/PollsRepository';
import IStoredUsersRepository from '../../domain/repositories/StoredUsersStoredRepository';
import IVotesRepository from '../../domain/repositories/VotesRepository';
import PrismaFeedbacksRepository from '../repositories/feedbacks/PrismaFeedbacksRepository';
import PrismaOptionsRepository from '../repositories/options/PrismaOptionsRepository';
import PrismaPollsRepository from '../repositories/polls/PrismaPollsRepository';
import PrismaStoredUsersRepository from '../repositories/storedUsers/PrismaStoredUsersRepository';
import PrismaVotesRepository from '../repositories/votes/PrismaVotesRepository.';

import { factoryPrismaClient } from './prismaClient';

const storedUsersRepository: IStoredUsersRepository = new PrismaStoredUsersRepository(factoryPrismaClient());

export function factoryStoredUsersRepository() {
  return storedUsersRepository;
}

const pollsRepository: IPollsRepository = new PrismaPollsRepository(factoryPrismaClient());

export function factoryPollsRepository() {
  return pollsRepository;
}

const optionsRepository: IOptionsRepository = new PrismaOptionsRepository(factoryPrismaClient());

export function factoryOptionsRepository() {
  return optionsRepository;
}

const votesRepository: IVotesRepository = new PrismaVotesRepository(factoryPrismaClient());

export function factoryVotesRepository() {
  return votesRepository;
}

const feedbacksRepository: IFeedbacksRepository = new PrismaFeedbacksRepository(factoryPrismaClient());

export function factoryFeedbacksRepository() {
  return feedbacksRepository;
}
