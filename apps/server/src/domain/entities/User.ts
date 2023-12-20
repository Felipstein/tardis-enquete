import Entity from './core/Entity';
import StoredUser from './StoredUser';

import type { OmitTyped } from '../../utils/OmitTyped';

interface UserProps {
  id: string;
  username: string;
  globalName: string;
  email: string;
  avatar: string;
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

  get avatar() {
    return this.attributes.avatar;
  }

  get auth() {
    return this.attributes.auth;
  }

  toObject(): UserProps {
    const originalFreezedObject = super.toObject();

    const object = {
      ...originalFreezedObject,
      auth: {
        ...originalFreezedObject.auth,
      },
    };

    // @ts-expect-error A propriedade id retorna dentro de auth, já que é um mero StoredUser.
    delete object.auth.id;

    return Object.freeze(object);
  }
}
