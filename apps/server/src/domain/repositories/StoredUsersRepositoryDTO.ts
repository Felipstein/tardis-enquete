import { OmitTyped } from '../../utils/OmitTyped';
import StoredUser, { UserRole } from '../entities/StoredUser';

export interface CreateStoredUserDTO {
  discordUserId: string;
  role?: UserRole;
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
}

export type UpdateStoredUserDTO = Partial<OmitTyped<StoredUser, 'id'>>;
