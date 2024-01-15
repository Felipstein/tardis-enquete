import NotFound from './NotFound';

export default class FeedbackNotExists extends NotFound {
  name = 'FeedbackNotExists';

  constructor(message = 'Feedback não encontrada') {
    super(message);
  }
}
