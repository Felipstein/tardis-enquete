import NotFound from './NotFound';

export default class PollNotExists extends NotFound {
  name = 'PollNotExists';

  constructor(message = 'Enquete não encontrada') {
    super(message);
  }
}
