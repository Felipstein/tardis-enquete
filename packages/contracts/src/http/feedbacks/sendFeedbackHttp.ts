import { z } from 'zod';

import { feedbackTypes } from '../../types';

export const sendFeedbackBodyRequest = z.object({
  text: z.string().min(3, 'O feedback deve conter pelo menos 3 caracteres'),
  type: z.enum(feedbackTypes),
});

export type SendFeedbackBodyRequest = z.infer<typeof sendFeedbackBodyRequest>;

export type SendFeedbackResponse = {
  feedbackId: string;
};
