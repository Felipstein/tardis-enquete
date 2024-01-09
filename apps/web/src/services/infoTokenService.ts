import { jwtDecode } from 'jwt-decode';

export default class InfoTokenService {
  getInfoPayload(token: string) {
    try {
      const payload = jwtDecode<{ info: string }>(token);

      return payload;
    } catch (error: unknown) {
      return null;
    }
  }
}

export const infoTokenService = new InfoTokenService();
