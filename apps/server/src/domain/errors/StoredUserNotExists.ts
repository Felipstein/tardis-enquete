import NotFound from './NotFound';

export default class StoredUserNotExists extends NotFound {
  name = 'StoredUserNotExists';

  constructor(message = 'Informações do usuário não encontradas') {
    super(message);
  }
}
