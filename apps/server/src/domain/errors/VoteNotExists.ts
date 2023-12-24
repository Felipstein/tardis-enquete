import NotFound from './NotFound';

export default class VoteNotExists extends NotFound {
  name = 'VoteNotExists';

  constructor(message = 'Voto não encontrado') {
    super(message);
  }
}
