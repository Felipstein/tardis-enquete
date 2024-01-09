import jwt from 'jsonwebtoken';
import ClientError from '@/shared/ClientError';

export default class InfoTokenService {
  private readonly secretKey: string;

  constructor() {
    const secretKey = process.env.INFO_TOKEN_SECRET_KEY;

    if (!secretKey) {
      throw new ClientError(
        'Ocorreu um erro no cliente, por favor, entre em contato urgentemente comigo!!!',
        'env INFO_TOKEN_SECRET_KEY is not defined',
      );
    }

    this.secretKey = secretKey;
  }

  sign(info: string) {
    const token = jwt.sign({ info }, this.secretKey, { expiresIn: '1d' });

    return token;
  }

  getInfoPayload(token: string) {
    try {
      const payload = jwt.decode(token) as { info: string };

      return payload;
    } catch (error: unknown) {
      return null;
    }
  }
}

export const infoTokenService = new InfoTokenService();
