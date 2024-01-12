import { PollTimeline } from '@tardis-enquete/contracts';

import StoredUserNotExists from '../domain/errors/StoredUserNotExists';
import IPollsRepository from '../domain/repositories/PollsRepository';
import { PollWithOptionsAndVotes } from '../domain/repositories/PollsRepositoryDTO';

import UserService from './UserService';

export default class PopulatePollService {
  constructor(
    private readonly pollsRepository: IPollsRepository,
    private readonly usersService: UserService,
  ) {}

  async populate({ poll, options }: PollWithOptionsAndVotes): Promise<PollTimeline> {
    type Vote = PollTimeline['options'][number]['votes'][number];

    const optionsPromises = options.map(async (option) => {
      const votesPromises = option.votes.map(async (vote) => {
        const user = await this._findUserInfo(vote.userId);

        return {
          id: vote.id,
          user: {
            id: user.id,
            username: user.username,
            globalName: user.globalName,
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
    } satisfies PollTimeline;
  }

  private async _findUserInfo(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new StoredUserNotExists(`Não há informações do usuário ${userId} cadastradas ainda`);
    }

    return user;
  }
}
