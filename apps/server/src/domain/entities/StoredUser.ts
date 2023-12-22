import Entity from './core/Entity';

export const userRoles = ['common', 'admin', 'developer'] as const;

export type UserRole = (typeof userRoles)[number];

interface StoredUserProps {
  id: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
}

export default class StoredUser extends Entity<StoredUserProps> {
  get id() {
    return this.attributes.id;
  }

  get role() {
    return this.attributes.role;
  }

  set role(role: UserRole) {
    this.attributes.role = role;
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

  set expiresIn(expiresIn: Date) {
    this.attributes.expiresIn = expiresIn;
  }
}
