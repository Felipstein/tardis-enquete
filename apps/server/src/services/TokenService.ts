import jwt from 'jsonwebtoken';

import type { UserRole } from '../domain/entities/StoredUser';

type TokenType = 'access';

interface TokenPayload {
  access: { sub: string; role: UserRole } & jwt.JwtPayload;
}

const tokenAssigntures: Record<TokenType, { secretKey: string; expiresIn: string }> = {
  access: { secretKey: process.env.ACCESS_TOKEN_SECRET_KEY, expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
};

type ValidVerifyPayload<TPayload extends object> = {
  status: 'valid';
  payload: TPayload;
};

type InvalidOrExpiredVerifyPayload<TPayload extends object> = {
  status: 'invalid' | 'expired';
  payload?: TPayload;
};

type VerifyPayload<TPayload extends object> = ValidVerifyPayload<TPayload> | InvalidOrExpiredVerifyPayload<TPayload>;

export default class TokenService {
  async sign<TTokenType extends TokenType, TPayload extends TokenPayload[TTokenType]>(
    secret: TTokenType,
    payload: TPayload,
  ) {
    const tokenAssignture = tokenAssigntures[secret];

    if (!tokenAssignture) {
      throw new Error(`Invalid token secret: ${secret}`);
    }

    const { secretKey, expiresIn } = tokenAssignture;

    return jwt.sign(payload, secretKey, { expiresIn });
  }

  async verify<TTokenType extends TokenType>(
    secret: TTokenType,
    token: string,
  ): Promise<VerifyPayload<TokenPayload[TTokenType]>> {
    const tokenAssignture = tokenAssigntures[secret];

    if (!tokenAssignture) {
      throw new Error(`Invalid token secret: ${secret}`);
    }

    const { secretKey } = tokenAssignture;

    try {
      const payload = jwt.verify(token, secretKey) as TokenPayload[TTokenType];

      return {
        status: 'valid',
        payload,
      };
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        return {
          status: 'expired',
        };
      }

      return {
        status: 'invalid',
      };
    }
  }

  async decode<TTokenType extends TokenType = any>(token: string): Promise<TokenPayload[TTokenType]> {
    return jwt.decode(token) as TokenPayload[TTokenType];
  }
}
