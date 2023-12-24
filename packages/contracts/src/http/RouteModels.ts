export const RouteModels = {
  devGenerateAccessToken: '/dev/generate-token',
  devGetDiscordUserInfo: '/dev/discord-user-info/:discordToken',
  authDiscordLogin: '/auth/discord/login',
  authDiscordCallback: '/auth/discord/callback',
  authVerifyToken: '/auth/verify',
  getPolls: '/polls',
  createPoll: '/polls',
  deletePoll: '/polls/:pollId',
  vote: '/options/:optionId/votes',
  unvote: '/votes/:voteId',
};
