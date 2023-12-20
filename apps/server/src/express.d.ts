import type { UserRole } from './domain/entities/StoredUser';

declare global {
  namespace Express {
    export interface Request {
      accessToken?: string;
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}
