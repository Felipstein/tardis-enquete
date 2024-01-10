import {
  GetPollByIdParamsRequest,
  GetPollByIdResponse,
  GetPollsResponse,
  RouteModels,
} from '@tardis-enquete/contracts';

import { api } from './apiService';

export type GetPollRequest = GetPollByIdParamsRequest;

export default class PollService {
  async getPolls() {
    const response = await api.get<GetPollsResponse>(RouteModels.getPolls);

    return response.data.polls;
  }

  async getPoll({ pollId }: GetPollRequest) {
    const response = await api.get<GetPollByIdResponse>(RouteModels.buildRoute(RouteModels.getPoll, { pollId }));

    return response.data.poll;
  }
}

export const pollService = new PollService();
