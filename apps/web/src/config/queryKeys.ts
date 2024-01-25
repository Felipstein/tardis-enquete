export const queryKeys = {
  token: () => ['token'],
  me: () => ['me'],
  discordOAuthURL: () => ['discordOAuthURL'],
  polls: () => ['polls'],
  poll: (pollId: string) => ['poll', pollId],
  feedbacks: () => ['feedbacks'],
  categories: () => ['categories'],
  categoriesFilter: () => ['categoriesFilter'],
  categoriesSelect: () => ['categoriesSelect'],
} as const;
