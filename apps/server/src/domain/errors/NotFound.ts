import APIError from './APIError';

export default class NotFound extends APIError {
  name = 'NotFound';

  constructor(message = 'Não encontrado') {
    super(message, 404);
  }
}
