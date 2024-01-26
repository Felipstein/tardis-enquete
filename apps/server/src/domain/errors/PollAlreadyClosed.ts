import Gone from './Gone';

export default class PollAlreadyClosed extends Gone {
  name = 'PollAlreadyClosed';

  constructor(message = 'A enquete já está fechada e não está mais disponível para votação') {
    super(message);
  }
}
