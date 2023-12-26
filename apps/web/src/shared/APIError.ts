import { APIErrorResponse } from '@tardis-enquete/contracts';

export default class APIError extends Error {
  readonly statusCode: APIErrorResponse['statusCode'];

  readonly debug: APIErrorResponse['debug'];

  constructor(apiErrorResponse: APIErrorResponse) {
    super(apiErrorResponse.message);

    this.name = apiErrorResponse.name;
    this.statusCode = apiErrorResponse.statusCode;
    this.debug = apiErrorResponse.debug;
  }
}
