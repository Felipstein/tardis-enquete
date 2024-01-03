import {
  RouteModels,
  UnvoteParamsRequest,
  UnvoteResponse,
  VoteParamsRequest,
  VoteResponse,
} from '@tardis-enquete/contracts';
import { api } from './apiService';

export default class VoteService {
  async vote({ optionId }: VoteParamsRequest, signal?: AbortSignal) {
    const response = await api.post<VoteResponse>(RouteModels.buildRoute(RouteModels.vote, { optionId }), null, {
      signal,
    });

    return response.data;
  }

  async unvote({ voteId }: UnvoteParamsRequest, signal?: AbortSignal) {
    const response = await api.delete<UnvoteResponse>(RouteModels.buildRoute(RouteModels.unvote, { voteId }), {
      signal,
    });

    return response.data;
  }
}

export const voteService = new VoteService();
