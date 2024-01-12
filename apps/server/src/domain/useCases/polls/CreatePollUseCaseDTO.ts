import { Poll } from '@tardis-enquete/contracts';

import { CreatePollDTO } from '../../repositories/PollsRepositoryDTO';

export type CreatePollUseCaseDTO = CreatePollDTO;

export type CreatePollUseCaseReturn = Poll;
