import APIError from './APIError';

export default class BadRequest extends APIError {
  name = 'BadRequest';

  constructor(message = 'Requisição inválida') {
    super(message, 400);
  }
}
