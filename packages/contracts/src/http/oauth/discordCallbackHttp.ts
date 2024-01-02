import { z } from 'zod';

export const discordCallbackQueryRequest = z.object({
  code: z.string({ required_error: 'Código é obrigatório', invalid_type_error: 'Código deve ser um texto' }),
});

export type DiscordCallbackQueryRequest = z.infer<typeof discordCallbackQueryRequest>;

export type DiscordCallbackResponse = {
  accessToken: string;
};
