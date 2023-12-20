import APIError from './APIError';

export default class Forbidden extends APIError {
  name = 'Forbidden';

  constructor(message = 'Não autorizado') {
    super(message, 403);
  }
}
