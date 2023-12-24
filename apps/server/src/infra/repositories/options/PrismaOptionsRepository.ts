import { PrismaClient } from '@prisma/client';

import Option from '../../../domain/entities/Option';
import IOptionsRepository from '../../../domain/repositories/OptionsRepository';

import PrismaOptionsMapper from './PrismaOptionsMapper';

export default class PrismaOptionsRepository implements IOptionsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findOptionVotedByUserInPoll(userId: string, pollId: string): Promise<Option | null> {
    const option = await this.prismaClient.option.findFirst({ where: { pollId, votes: { some: { userId } } } });

    if (!option) {
      return null;
    }

    return PrismaOptionsMapper.toDomain(option);
  }

  async findById(optionId: string): Promise<Option | null> {
    const option = await this.prismaClient.option.findUnique({ where: { id: optionId } });

    if (!option) {
      return null;
    }

    return PrismaOptionsMapper.toDomain(option);
  }
}
