import { FeedbackType } from '@tardis-enquete/contracts';

export interface CreateFeedbackDTO {
  text: string;
  type: FeedbackType;
  authorId: string;
}
