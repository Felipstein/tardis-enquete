import {
  CreatePollBodyRequest,
  CreatePollResponse,
  DeletePollParamsRequest,
  GetPollByIdParamsRequest,
  GetPollByIdResponse,
  GetPollsResponse,
  RouteModels,
  UpdatePollBodyRequest,
  UpdatePollParamsRequest,
  UpdatePollResponse,
} from '@tardis-enquete/contracts';

import { api } from './apiService';

export type GetPollRequest = GetPollByIdParamsRequest;

export type CreatePollRequest = CreatePollBodyRequest;

export type UpdatePollRequest = UpdatePollParamsRequest & UpdatePollBodyRequest;

export type DeletePollRequest = DeletePollParamsRequest;

export default class PollService {
  async getPolls() {
    const response = await api.get<GetPollsResponse>(RouteModels.getPolls);

    return response.data.polls;
  }

  async getPoll({ pollId }: GetPollRequest) {
    const response = await api.get<GetPollByIdResponse>(RouteModels.buildRoute(RouteModels.getPoll, { pollId }));

    return response.data.poll;
  }

  async create(data: CreatePollRequest) {
    const response = await api.post<CreatePollResponse>(RouteModels.createPoll, data);

    return response.data.poll;
  }

  async update({ pollId, ...data }: UpdatePollRequest) {
    const response = await api.put<UpdatePollResponse>(
      RouteModels.buildRoute(RouteModels.updatePoll, { pollId }),
      data,
    );

    return response.data.poll;
  }

  async delete({ pollId }: DeletePollRequest) {
    const response = await api.delete<void>(RouteModels.buildRoute(RouteModels.deletePoll, { pollId }));

    return response.data;
  }
}

export const pollService = new PollService();
