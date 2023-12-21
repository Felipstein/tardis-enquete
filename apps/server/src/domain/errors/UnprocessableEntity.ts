import APIError from './APIError';

export default class UnprocessableEntity extends APIError {
  name = 'UnprocessableEntity';

  constructor(message = 'Entidade improcessável') {
    super(message, 422);
  }
}
