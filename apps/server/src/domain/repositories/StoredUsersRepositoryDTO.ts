import { OmitTyped } from '../../utils/OmitTyped';
import StoredUser, { UserRole } from '../entities/StoredUser';

export interface CreateStoredUserDTO {
  discordUserId: string;
  role?: UserRole;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type UpdateStoredUserDTO = Partial<OmitTyped<StoredUser, 'id'>>;
