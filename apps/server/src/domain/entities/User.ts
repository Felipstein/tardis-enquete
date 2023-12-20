import { OmitTyped } from '../../utils/OmitTyped';

import Entity from './core/Entity';
import StoredUser from './StoredUser';

interface UserProps {
  id: string;
  username: string;
  globalName: string;
  email: string;
  auth: OmitTyped<StoredUser, 'id'>;
}

export default class User extends Entity<UserProps> {
  get id() {
    return this.attributes.id;
  }

  get username() {
    return this.attributes.username;
  }

  get globalName() {
    return this.attributes.globalName;
  }

  get email() {
    return this.attributes.email;
  }

  get auth() {
    return this.attributes.auth;
  }

  toObject(): UserProps {
    const object = super.toObject();

    // @ts-expect-error A propriedade id retorna dentro de auth, já que é um mero StoredUser.
    delete object.auth.id;

    return object;
  }
}
