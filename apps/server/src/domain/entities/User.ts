import Entity from './core/Entity';
import StoredUser, { UserRole } from './StoredUser';

import type { OmitTyped } from '../../utils/OmitTyped';

type StoredUserWithoutId = OmitTyped<StoredUser, 'id'>;

interface UserProps {
  id: string;
  username: string;
  globalName: string;
  email: string;
  avatar: string;
  role: UserRole;
  auth: StoredUserWithoutId;
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

  get role() {
    return this.attributes.auth.role;
  }

  set role(role: UserRole) {
    this.attributes.auth.role = role;
  }

  get auth() {
    return this.attributes.auth;
  }

  set auth(auth: StoredUserWithoutId) {
    this.attributes.auth = auth;
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
