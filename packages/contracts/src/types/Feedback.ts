export const feedbackTypes = ['bug', 'suggestion', 'other'] as const;

export const feedbackStatuses = ['open', 'closed'] as const;

export type FeedbackType = (typeof feedbackTypes)[number];

export type FeedbackStatuses = (typeof feedbackStatuses)[number];

export interface Feedback {
  id: string;
  text: string;
  type: FeedbackType;
  status: FeedbackStatuses;
  author: {
    id: string;
    username: string;
    globalName: string;
    avatar: string;
  };
}
