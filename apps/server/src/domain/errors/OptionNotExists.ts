import NotFound from './NotFound';

export default class OptionNotExists extends NotFound {
  name = 'OptionNotExists';

  constructor(message = 'Opção não encontrada') {
    super(message);
  }
}
