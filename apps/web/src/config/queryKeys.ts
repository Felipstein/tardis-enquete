export const queryKeys = {
  token: () => ['token'],
  me: () => ['me'],
  discordOAuthURL: () => ['discordOAuthURL'],
  polls: () => ['polls'],
  poll: (pollId: string) => ['poll', pollId],
  feedbacks: () => ['feedbacks'],
  categoriesFilter: () => ['categoriesFilter'],
} as const;
