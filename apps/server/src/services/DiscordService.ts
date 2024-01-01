import querystring from 'querystring';
import util from 'util';

import axios, { AxiosError, AxiosInstance } from 'axios';
import chalk from 'chalk';
import { z } from 'zod';

import APIError from '../domain/errors/APIError';

import { ExchangeCodeForTokenResponse, GetUserInfoResponse } from './DiscordServiceDTO';

const defaultServiceBuilder = z.object({
  clientId: z.string().optional(),
  secretKey: z.string().optional(),
});

export default class DefaultService {
  private readonly discordAPI: AxiosInstance;

  private readonly clientId: string;

  private readonly secretKey: string;

  constructor(builder?: z.infer<typeof defaultServiceBuilder>) {
    this.clientId = builder?.clientId ?? process.env.DISCORD_CLIENT_ID;
    this.secretKey = builder?.secretKey ?? process.env.DISCORD_SECRET_KEY;

    this.discordAPI = axios.create({
      baseURL: 'https://discord.com',
    });

    this.discordAPI.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(chalk.red('Discord Request throwed an error:'));
        console.error(util.inspect(error, true, null, true));

        if (error instanceof AxiosError) {
          const responseData = error.response?.data;

          if (responseData?.error && responseData?.error_description) {
            const { error: error_name, error_description } = responseData;

            const errorInstance = new Error(error_description);

            errorInstance.name = `[Discord Error] ${error_name}`;

            throw errorInstance;
          } else if (responseData?.message) {
            const { message } = responseData;

            const errorInstance = new APIError(message, error.response!.status);

            errorInstance.name = `[Discord Error] ${error.response!.statusText}`;

            throw errorInstance;
          }
        }

        throw error;
      },
    );
  }

  getConsentOAuthURL(redirectBaseURL: string) {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${redirectBaseURL}/auth/discord/callback&scope=identify+email`;

    return url;
  }

  async exchangeCodeForToken(code: string, redirectBaseURL: string) {
    const payload = {
      client_id: this.clientId,
      client_secret: this.secretKey,
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${redirectBaseURL}/auth/discord/callback`,
    };

    const response = await this.discordAPI.post<ExchangeCodeForTokenResponse>(
      '/api/oauth2/token',
      querystring.stringify(payload),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  }

  async getUserInfo(accessToken: string) {
    const response = await this.discordAPI.get<GetUserInfoResponse>('/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  }
}
