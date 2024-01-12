import { PrismaClient } from '@prisma/client';

import Poll from '../../../domain/entities/Poll';
import IPollsRepository from '../../../domain/repositories/PollsRepository';
import {
  PollWithOptionsAndVotes,
  CreatePollDTO,
  UpdatePollDTO,
  PollWithOptions,
} from '../../../domain/repositories/PollsRepositoryDTO';

import PrismaPollsMapper from './PrismaPollsMapper';

export default class PrismaPollsRepository implements IPollsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async exists(id: string): Promise<boolean> {
    const poll = await this.prismaClient.poll.findUnique({ where: { id }, select: { id: true } });

    return !!poll;
  }

  async findAllWithOptionsAndVotes(): Promise<PollWithOptionsAndVotes[]> {
    const polls = await this.prismaClient.poll.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        options: {
          include: {
            votes: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    const pollsPopuled = polls.map((poll) => ({
      poll: PrismaPollsMapper.toDomain(poll),
      options: poll.options.map(
        (option) =>
          ({
            id: option.id,
            text: option.text,
            votes: option.votes.map(
              (vote) =>
                ({
                  id: vote.id,
                  userId: vote.userId,
                }) satisfies PollWithOptionsAndVotes['options'][number]['votes'][number],
            ),
          }) satisfies PollWithOptionsAndVotes['options'][number],
      ),
    }));

    return pollsPopuled;
  }

  async findByIdWithOptions(id: string): Promise<PollWithOptions | null> {
    const poll = await this.prismaClient.poll.findUnique({
      where: { id },
      include: {
        options: {
          select: {
            id: true,
            text: true,
            _count: {
              select: {
                votes: true,
              },
            },
          },
        },
      },
    });

    if (!poll) {
      return null;
    }

    const { options, ...pollWithoutOptions } = poll;

    return {
      poll: PrismaPollsMapper.toDomain(pollWithoutOptions),
      options: options.map((option) => ({
        ...option,
        _count: undefined,
        totalVotes: option._count.votes,
      })),
    };
  }

  async findByIdWithOptionsAndVotes(id: string): Promise<PollWithOptionsAndVotes | null> {
    const poll = await this.prismaClient.poll.findUnique({
      where: { id },
      include: {
        options: {
          include: {
            votes: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!poll) {
      return null;
    }

    const pollPopuled = {
      poll: PrismaPollsMapper.toDomain(poll),
      options: poll.options.map(
        (option) =>
          ({
            id: option.id,
            text: option.text,
            votes: option.votes.map(
              (vote) =>
                ({
                  id: vote.id,
                  userId: vote.userId,
                }) satisfies PollWithOptionsAndVotes['options'][number]['votes'][number],
            ),
          }) satisfies PollWithOptionsAndVotes['options'][number],
      ),
    };

    return pollPopuled;
  }

  async findPollThatContainsOption(optionId: string): Promise<Poll | null> {
    const poll = await this.prismaClient.poll.findFirst({ where: { options: { some: { id: optionId } } } });

    if (!poll) {
      return null;
    }

    return PrismaPollsMapper.toDomain(poll);
  }

  async countTotalPollsOfUserId(userId: string): Promise<number> {
    const totalPolls = await this.prismaClient.poll.count({ where: { authorId: userId } });

    return totalPolls;
  }

  async create(data: CreatePollDTO): Promise<Poll> {
    const poll = await this.prismaClient.poll.create({
      data: {
        title: data.title,
        description: data.description,
        expireAt: data.expireAt,
        authorId: data.authorId,
        options: {
          createMany: {
            data: data.options.map((option) => ({
              text: option,
            })),
          },
        },
      },
    });

    return PrismaPollsMapper.toDomain(poll);
  }

  async update(id: string, data: UpdatePollDTO): Promise<Poll> {
    const poll = await this.prismaClient.poll.update({
      where: { id },
      data,
    });

    return PrismaPollsMapper.toDomain(poll);
  }

  async updateByInstance(data: Poll): Promise<void> {
    const { id, ...dataToUpdate } = data;

    await this.prismaClient.poll.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaClient.poll.delete({ where: { id } });
  }
}
