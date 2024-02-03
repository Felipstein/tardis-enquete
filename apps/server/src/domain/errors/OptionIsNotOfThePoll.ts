import BadRequest from './BadRequest';

export default class OptionIsNotOfThePoll extends BadRequest {
  name = 'OptionIsNotOfThePoll';

  constructor(message = 'Opção não é da enquete fornecida') {
    super(message);
  }
}
