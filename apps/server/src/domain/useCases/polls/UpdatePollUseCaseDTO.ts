import { Poll } from '@tardis-enquete/contracts';

import { UpdatePollDTO } from '../../repositories/PollsRepositoryDTO';

export type UpdatePollUseCaseDTO = UpdatePollDTO & { id: string; options?: string[] };

export type UpdatePollUseCaseReturn = Poll;
