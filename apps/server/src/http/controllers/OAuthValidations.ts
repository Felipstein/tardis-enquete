import { z } from 'zod';

export const handleDiscordCallbackQueryRequest = z.object({
  code: z.string(),
});

export type HandleDiscordCallbackQueryRequest = z.infer<typeof handleDiscordCallbackQueryRequest>;
