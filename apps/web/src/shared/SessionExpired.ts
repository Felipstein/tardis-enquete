import { APIErrorResponse } from '@tardis-enquete/contracts';
import APIError from './APIError';

export default class SessionExpired extends APIError {
  name = 'SessionExpired';

  constructor(apiErrorResponse: APIErrorResponse) {
    super(apiErrorResponse);
  }
}
