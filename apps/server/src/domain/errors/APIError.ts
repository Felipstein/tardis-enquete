import type { APIErrorResponse } from '@tardis-enquete/contracts';

export default class APIError extends Error {
  name = 'APIError';

  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
  }

  toString(): APIErrorResponse {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      debug: {
        stack: this.stack || new Error().stack!,
      },
    };
  }
}
