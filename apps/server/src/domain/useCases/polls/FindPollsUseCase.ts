import UserService from '../../../services/UserService';
import StoredUserNotExists from '../../errors/StoredUserNotExists';
import IPollsRepository from '../../repositories/PollsRepository';

import { FindPollsUseCaseReturn } from './FindPollsUseCaseDTO';

export default class FindPollsUseCase {
  constructor(
    private readonly pollsRepository: IPollsRepository,
    private readonly usersService: UserService,
  ) {}

  async execute(): Promise<FindPollsUseCaseReturn> {
    const polls = await this.pollsRepository.findAllWithOptionsAndVotes();

    const pollsPopuledPromises = polls.map(async ({ poll, options }) => {
      type Vote = FindPollsUseCaseReturn[number]['options'][number]['votes'][number];

      const optionsPromises = options.map(async (option) => {
        const votesPromises = option.votes.map(async (vote) => {
          const user = await this._findUserInfo(vote.userId);

          return {
            id: vote.id,
            user: {
              id: user.id,
              username: user.username,
              globlaName: user.globalName,
              avatar: user.avatar,
            },
          } satisfies Vote;
        });

        const votes = await Promise.all(votesPromises);

        return {
          id: option.id,
          text: option.text,
          votes,
        };
      });

      const [authorInfo, totalPolls, ...optionsResolved] = await Promise.all([
        this._findUserInfo(poll.authorId),
        this.pollsRepository.countTotalPollsOfUserId(poll.authorId),
        ...optionsPromises,
      ]);

      return {
        id: poll.id,
        title: poll.title,
        description: poll.description,
        createdAt: poll.createdAt,
        expireAt: poll.expireAt,
        author: {
          id: authorInfo.id,
          username: authorInfo.username,
          globalName: authorInfo.globalName,
          avatar: authorInfo.avatar,
          totalPolls,
        },
        options: optionsResolved,
      } satisfies FindPollsUseCaseReturn[number];
    });

    const pollsPopuled = await Promise.all(pollsPopuledPromises);

    return pollsPopuled;
  }

  private async _findUserInfo(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new StoredUserNotExists(`Não há informações do usuário ${userId} cadastradas ainda`);
    }

    return user;
  }
}
