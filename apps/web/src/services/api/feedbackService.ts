import {
  CloseFeedbackParamsRequest,
  DeleteFeedbackParamsRequest,
  GetFeedbacksResponse,
  RouteModels,
  SendFeedbackBodyRequest,
  SendFeedbackResponse,
} from '@tardis-enquete/contracts';
import { api } from './apiService';

type SendFeedbackRequest = SendFeedbackBodyRequest;

type CloseFeedbackRequest = CloseFeedbackParamsRequest;

type DeleteFeedbackRequest = DeleteFeedbackParamsRequest;

export default class FeedbackService {
  async getFeedbacks() {
    const response = await api.get<GetFeedbacksResponse>(RouteModels.getFeedbacks);

    return response.data.feedbacks;
  }

  async sendFeedback(data: SendFeedbackRequest) {
    const response = await api.post<SendFeedbackResponse>(RouteModels.sendFeedback, data);

    return response.data.feedbackId;
  }

  async closeFeedback({ feedbackId }: CloseFeedbackRequest) {
    const response = await api.patch<void>(RouteModels.buildRoute(RouteModels.closeFeedback, { feedbackId }));

    return response.data;
  }

  async deleteFeedback({ feedbackId }: DeleteFeedbackRequest) {
    const response = await api.delete<void>(RouteModels.buildRoute(RouteModels.deleteFeedback, { feedbackId }));

    return response.data;
  }
}

export const feedbackService = new FeedbackService();
