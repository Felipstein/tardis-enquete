export const userRoles = ['common', 'admin', 'developer'] as const;

export type UserRole = (typeof userRoles)[number];

export interface User {
  id: string;
  username: string;
  globalName: string;
  email: string;
  avatar: string;
  role: UserRole;
  auth: {
    role: UserRole;
    accessToken: string;
    refreshToken: string;
    expiresIn: Date;
  };
}
