import Gone from './Gone';

export default class PollAlreadyExpired extends Gone {
  name = 'PollAlreadyExpired';

  constructor(message = 'A enquete expirou e não está mais disponível para votação') {
    super(message);
  }
}
