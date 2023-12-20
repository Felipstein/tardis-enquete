export interface CreateStoredUserDTO {
  discordUserId: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
