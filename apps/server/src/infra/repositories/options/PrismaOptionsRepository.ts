import { PrismaClient } from '@prisma/client';

import Option from '../../../domain/entities/Option';
import IOptionsRepository from '../../../domain/repositories/OptionsRepository';

import PrismaOptionsMapper from './PrismaOptionsMapper';

export default class PrismaOptionsRepository implements IOptionsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findOptionsOfPoll(pollId: string): Promise<Option[]> {
    const options = await this.prismaClient.option.findMany({
      where: { pollId },
    });

    return options.map(PrismaOptionsMapper.toDomain);
  }

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

  async createMany(pollId: string, options: string[]): Promise<Option[]> {
    const createdOptions = await Promise.all(
      options.map((option) => this.prismaClient.option.create({ data: { pollId, text: option } })),
    );

    return createdOptions.map(PrismaOptionsMapper.toDomain);
  }

  async deleteOptionsOfPoll(pollId: string): Promise<void> {
    await this.prismaClient.option.deleteMany({ where: { pollId } });
  }
}
