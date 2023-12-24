import APIError from './APIError';

export default class Conflict extends APIError {
  name = 'Conflict';

  constructor(message = 'Conflito') {
    super(message, 409);
  }
}
