import { GetDiscordOAuthURLResponse, RouteModels } from '@tardis-enquete/contracts';

import { api } from './apiService';

export default class AuthService {
  async getDiscordOAuthURL() {
    const response = await api.get<GetDiscordOAuthURLResponse>(RouteModels.authDiscordLogin);

    return response.data.redirectURL;
  }
}

export const authService = new AuthService();
