import { z } from 'zod';

export const changePollCloseStatusParamsRequest = z.object({
  pollId: z.string(),
});

export const changePollCloseStatusBodyRequest = z.object({
  close: z.boolean(),
});

export type ChangePollCloseStatusParamsRequest = z.infer<typeof changePollCloseStatusParamsRequest>;

export type ChangePollCloseStatusBodyRequest = z.infer<typeof changePollCloseStatusBodyRequest>;

export type ChangePollCloseStatusResponse = void;
