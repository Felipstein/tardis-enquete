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
  changePollClosedStatus: '/polls/:pollId/closed-status',
  deletePoll: '/polls/:pollId',
  vote: '/options/:optionId/votes',
  unvote: '/votes/:voteId',
  getFeedbacks: '/feedbacks',
  sendFeedback: '/feedbacks',
  closeFeedback: '/feedbacks/:feedbackId/close',
  deleteFeedback: '/feedbacks/:feedbackId',
  getCategories: '/categories',
  getCategoriesForFilter: '/categories-filter',
  getCategoriesForSelect: '/categories-select',
  createCategory: '/categories',
  updateCategory: '/categories/:categoryId',
  deleteCategory: '/categories/:categoryId',

  buildRoute(route: string, params: Record<string, string | number>) {
    let builtRoute = route;

    Object.keys(params).forEach((key) => {
      builtRoute = builtRoute.replace(`:${key}`, String(params[key]));
    });

    return builtRoute;
  },
};
