export const queryKeys = {
  token: () => ['token'],
  me: () => ['me'],
  discordOAuthURL: () => ['discordOAuthURL'],
  polls: () => ['polls'],
  poll: (pollId: string) => ['poll', pollId],
} as const;
