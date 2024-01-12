import { GetPollByIdResponse } from '@tardis-enquete/contracts';

export type FindPollByIdUseCaseInput = {
  pollId: string;
};

export type FindPollByIdUseCaseReturn = GetPollByIdResponse['poll'];
