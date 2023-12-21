import { z } from 'zod';

export const generateAccessTokenBodyRequest = z.object({
  discordUserId: z.string(),
  role: z.enum(['common', 'admin', 'developer']),
  expiresIn: z.string().optional(),
});

export type GenerateAccessTokenBodyRequest = z.infer<typeof generateAccessTokenBodyRequest>;

export type GenerateAccessTokenResponse = {
  token: string;
};
