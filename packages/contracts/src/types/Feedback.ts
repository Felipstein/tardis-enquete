export const feedbackTypes = ['bug', 'suggestion', 'other'] as const;

export type FeedbackType = (typeof feedbackTypes)[number];

export interface Feedback {
  id: string;
  text: string;
  type: FeedbackType;
  status: 'open' | 'closed';
  author: {
    id: string;
    username: string;
    globalName: string;
    avatar: string;
  };
}
