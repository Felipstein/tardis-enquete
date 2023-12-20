import Entity from './core/Entity';

interface StoredUserProps {
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export default class StoredUser extends Entity<StoredUserProps> {
  get id() {
    return this.attributes.id;
  }

  get accessToken() {
    return this.attributes.accessToken;
  }

  set accessToken(accessToken: string) {
    this.attributes.accessToken = accessToken;
  }

  get refreshToken() {
    return this.attributes.refreshToken;
  }

  set refreshToken(refreshToken: string) {
    this.attributes.refreshToken = refreshToken;
  }

  get expiresIn() {
    return this.attributes.expiresIn;
  }

  set expiresIn(expiresIn: number) {
    this.attributes.expiresIn = expiresIn;
  }
}
