import { Vote as PrismaVote } from '@prisma/client';

import Vote from '../../../domain/entities/Vote';

export default class PrismaVotesMapper {
  static toDomain(vote: PrismaVote): Vote {
    return new Vote({
      id: vote.id,
      optionId: vote.optionId,
      userId: vote.userId,
    });
  }
}
