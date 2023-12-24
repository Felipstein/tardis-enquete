import APIError from './APIError';

export default class Gone extends APIError {
  name = 'Gone';

  constructor(
    message = 'O recurso de destino não está mais disponível no servidor e essa condição provavelmente será permanentemente',
  ) {
    super(message, 410);
  }
}
