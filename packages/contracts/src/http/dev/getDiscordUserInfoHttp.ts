import { z } from 'zod';

export const getDiscordUserInfoParamsRequest = z.object({
  discordToken: z.string(),
});

export type GetDiscordUserInfoParamsRequest = z.infer<typeof getDiscordUserInfoParamsRequest>;

export type GetDiscordUserInfoResponse = unknown;
