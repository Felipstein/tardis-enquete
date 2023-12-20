import { OmitTyped } from '../../utils/OmitTyped';
import StoredUser from '../entities/StoredUser';

export interface CreateStoredUserDTO {
  discordUserId: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type UpdateStoredUserDTO = Partial<OmitTyped<ReturnType<StoredUser['toObject']>, 'id'>>;
