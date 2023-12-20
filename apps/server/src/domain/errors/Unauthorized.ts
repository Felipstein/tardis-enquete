import APIError from './APIError';

export default class Unauthorized extends APIError {
  name = 'Unauthorized';

  constructor(message = 'Não autenticado') {
    super(message, 401);
  }
}
