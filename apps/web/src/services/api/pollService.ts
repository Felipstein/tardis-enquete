import { GetPollsResponse, RouteModels } from '@tardis-enquete/contracts';

import { api } from './apiService';

export default class PollService {
  async getPolls() {
    const response = await api.get<GetPollsResponse>(RouteModels.getPolls);

    return response.data.polls;
  }
}

export const pollService = new PollService();
