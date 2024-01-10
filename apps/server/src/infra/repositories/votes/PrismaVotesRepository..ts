import { PrismaClient } from '@prisma/client';

import Vote from '../../../domain/entities/Vote';
import IVotesRepository from '../../../domain/repositories/VotesRepository';
import { CreateVoteDTO } from '../../../domain/repositories/VotesRepositoryDTO';

import PrismaVotesMapper from './PrismaVotesMapper';

export default class PrismaVotesRepository implements IVotesRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async existsByUserAndOption(userId: string, optionId: string): Promise<boolean> {
    const vote = await this.prismaClient.vote.findFirst({ where: { userId, optionId }, select: { id: true } });

    return !!vote;
  }

  async findById(id: string): Promise<Vote | null> {
    const vote = await this.prismaClient.vote.findUnique({ where: { id } });

    if (!vote) {
      return null;
    }

    return PrismaVotesMapper.toDomain(vote);
  }

  async findAllVotesOfOptionId(optionId: string): Promise<Vote[]> {
    const vote = await this.prismaClient.vote.findMany({ where: { optionId } });

    return vote.map(PrismaVotesMapper.toDomain);
  }

  async create({ optionId, userId }: CreateVoteDTO): Promise<Vote> {
    const vote = await this.prismaClient.vote.create({ data: { optionId, userId } });

    return PrismaVotesMapper.toDomain(vote);
  }

  async delete(id: string): Promise<void> {
    await this.prismaClient.vote.delete({ where: { id } });
  }
}
