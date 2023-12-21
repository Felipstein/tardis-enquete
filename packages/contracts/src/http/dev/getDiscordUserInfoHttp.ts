import { z } from 'zod';

export const getDiscordUserInfoParamsRequest = z.object({
  discordUserId: z.string(),
});

export const getDiscordUserInfoHeadersRequest = z.object({
  'x-discord-token': z.string(),
});

export type GetDiscordUserInfoParamsRequest = z.infer<typeof getDiscordUserInfoParamsRequest>;

export type GetDiscordUserInfoHeadersRequest = z.infer<typeof getDiscordUserInfoHeadersRequest>;

export type GetDiscordUserInfoResponse = unknown;
