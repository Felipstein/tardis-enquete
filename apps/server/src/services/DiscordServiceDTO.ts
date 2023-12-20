export interface ErrorResponse {
  error: string;
  error_description: string;
}

export interface ExchangeCodeForTokenResponse {
  token_type: 'Bearer';
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: 'email identify';
}

export interface GetUserInfoResponse {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: string | null;
  accent_color: string | null;
  global_name: string;
  avatar_decoration_data: {
    asset: string;
    sku_id: string;
  };
  banner_color: string | null;
  mfa_enabled: boolean;
  locale: string;
  email: string;
  verified: boolean;
}
