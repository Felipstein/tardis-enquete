import {
  ChangePollCloseStatusBodyRequest,
  ChangePollCloseStatusParamsRequest,
  ChangePollCloseStatusResponse,
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

export type ChangePollClosedStatusRequest = ChangePollCloseStatusParamsRequest & ChangePollCloseStatusBodyRequest;

export type DeletePollRequest = DeletePollParamsRequest;

export default class PollService {
  async getPolls() {
    const response = await api.get<GetPollsResponse>(RouteModels.getPolls);

    const polls = response.data.polls.map((poll) => ({
      ...poll,
      createdAt: new Date(poll.createdAt),
      expireAt: poll.expireAt && new Date(poll.expireAt),
    }));

    return polls;
  }

  async getPoll({ pollId }: GetPollRequest) {
    const response = await api.get<GetPollByIdResponse>(RouteModels.buildRoute(RouteModels.getPoll, { pollId }));

    const poll = {
      ...response.data.poll,
      createdAt: new Date(response.data.poll.createdAt),
      expireAt: response.data.poll.expireAt && new Date(response.data.poll.expireAt),
    };

    return poll;
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

  async changeClosedStatus({ pollId, ...data }: ChangePollClosedStatusRequest) {
    const response = await api.patch<ChangePollCloseStatusResponse>(
      RouteModels.buildRoute(RouteModels.changePollClosedStatus, { pollId }),
      data,
    );

    return response.data;
  }

  async delete({ pollId }: DeletePollRequest) {
    const response = await api.delete<void>(RouteModels.buildRoute(RouteModels.deletePoll, { pollId }));

    return response.data;
  }
}

export const pollService = new PollService();
