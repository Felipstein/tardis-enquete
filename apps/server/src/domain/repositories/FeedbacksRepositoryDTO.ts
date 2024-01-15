import { FeedbackStatuses, FeedbackType } from '@tardis-enquete/contracts';

export interface CreateFeedbackDTO {
  text: string;
  type: FeedbackType;
  authorId: string;
}

export interface UpdateFeedbackDTO {
  text?: string;
  type?: FeedbackType;
  status?: FeedbackStatuses;
}
