import {
  DiscordCallbackQueryRequest,
  GetDiscordOAuthURLResponse,
  RouteModels,
  VerifyTokenQueryRequest,
  VerifyTokenResponse,
} from '@tardis-enquete/contracts';

import { api } from './apiService';

export default class AuthService {
  async getDiscordOAuthURL() {
    const response = await api.get<GetDiscordOAuthURLResponse>(RouteModels.authDiscordLogin);

    return response.data.redirectURL;
  }

  async handleDiscordCallback(query: DiscordCallbackQueryRequest) {
    const response = await api.get(RouteModels.authDiscordCallback, { params: query });

    console.log(response.headers, response.data);
  }

  async verifyToken(query: VerifyTokenQueryRequest) {
    const response = await api.get<VerifyTokenResponse>(RouteModels.authVerifyToken, { params: query });

    return response.data.user;
  }
}

export const authService = new AuthService();
