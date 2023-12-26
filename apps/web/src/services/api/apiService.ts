import { APIErrorResponse, apiErrorHeader } from '@tardis-enquete/contracts';
import axios, { AxiosError } from 'axios';

import APIError from '@/shared/APIError';
import { getServerURL } from '@/utils/getServerURL';

export const api = axios.create({
  baseURL: getServerURL(),
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      if (error.code === 'ERR_NETWORK') {
        throw new APIError({
          name: 'ServerOffline',
          message: 'Servidor fora de operação, por favor, entre em contato comigo urgentemente!!!',
          statusCode: 503,
        });
      }

      const isAPIError = error.response?.headers[apiErrorHeader] === 'true';

      if (isAPIError) {
        const apiErrorResponse = error.response!.data as APIErrorResponse;

        throw new APIError(apiErrorResponse);
      }

      const { name, message, response } = error;

      const statusCode = response?.status || 500;

      throw new APIError({ name, message, statusCode });
    }

    throw error;
  },
);
