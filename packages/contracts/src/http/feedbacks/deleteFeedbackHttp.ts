import { z } from 'zod';

export const deleteFeedbackParamsRequest = z.object({
  feedbackId: z.string(),
});

export type DeleteFeedbackParamsRequest = z.infer<typeof deleteFeedbackParamsRequest>;
