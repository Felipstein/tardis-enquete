/* eslint-disable default-param-last */

import APIError from './APIError';

export default class InternalServerError extends APIError {
  name = 'InternalServerError';

  constructor(
    message = 'Erro interno do servidor',
    statusCode = 500,
    public originalError: Error | undefined = undefined,
  ) {
    super(message, statusCode);
  }
}
