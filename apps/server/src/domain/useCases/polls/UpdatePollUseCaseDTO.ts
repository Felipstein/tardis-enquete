import { Poll, UpdatePollBodyRequest } from '@tardis-enquete/contracts';

import { UpdatePollDTO } from '../../repositories/PollsRepositoryDTO';

export type UpdatePollUseCaseDTO = UpdatePollDTO & { id: string; options?: UpdatePollBodyRequest['options'] };

export type UpdatePollUseCaseReturn = Poll;
