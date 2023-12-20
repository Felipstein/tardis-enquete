import APIError from './APIError';

export default class TooManyRequests extends APIError {
  name = 'TooManyRequests';

  constructor(message = 'Muitas requisições, tente novamente mais tarde') {
    super(message, 429);
  }
}
