import { UserRole } from '../../entities/StoredUser';

export interface GenerateAccessTokenUseCaseDTO {
  userId: string;
  role: UserRole;
  expiresIn?: string;
}
