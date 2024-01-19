import NotFound from './NotFound';

export default class CategoryNotExists extends NotFound {
  name = 'CategoryNotExists';

  constructor(message = 'Categoria não encontrada') {
    super(message);
  }
}
