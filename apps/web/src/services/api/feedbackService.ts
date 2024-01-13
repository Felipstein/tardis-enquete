import {
  GetFeedbacksResponse,
  RouteModels,
  SendFeedbackBodyRequest,
  SendFeedbackResponse,
} from '@tardis-enquete/contracts';
import { api } from './apiService';

type SendFeedbackRequest = SendFeedbackBodyRequest;

export default class FeedbackService {
  async sendFeedback(data: SendFeedbackRequest) {
    const response = await api.post<SendFeedbackResponse>(RouteModels.sendFeedback, data);

    return response.data.feedbackId;
  }

  async getFeedbacks() {
    const response = await api.get<GetFeedbacksResponse>(RouteModels.getFeedbacks);

    return response.data.feedbacks;
  }
}

export const feedbackService = new FeedbackService();
