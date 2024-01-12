export const RouteModels = {
  devGenerateAccessToken: '/dev/generate-token',
  devGetDiscordUserInfo: '/dev/discord-user-info/:discordToken',
  authDiscordLogin: '/auth/discord/login',
  authDiscordCallback: '/auth/discord/callback',
  authVerifyToken: '/auth/verify',
  getPolls: '/polls',
  getPoll: '/polls/:pollId',
  createPoll: '/polls',
  updatePoll: '/polls/:pollId',
  deletePoll: '/polls/:pollId',
  vote: '/options/:optionId/votes',
  unvote: '/votes/:voteId',

  buildRoute(route: string, params: Record<string, string | number>) {
    let builtRoute = route;

    Object.keys(params).forEach((key) => {
      builtRoute = builtRoute.replace(`:${key}`, String(params[key]));
    });

    return builtRoute;
  },
};
