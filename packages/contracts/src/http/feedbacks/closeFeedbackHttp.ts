import { z } from 'zod';

export const closeFeedbackParamsRequest = z.object({
  feedbackId: z.string(),
});

export type CloseFeedbackParamsRequest = z.infer<typeof closeFeedbackParamsRequest>;
