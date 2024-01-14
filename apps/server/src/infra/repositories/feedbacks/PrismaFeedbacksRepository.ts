import { PrismaClient } from '@prisma/client';

import Feedback from '../../../domain/entities/Feedback';
import IFeedbacksRepository from '../../../domain/repositories/FeedbacksRepository';
import { CreateFeedbackDTO } from '../../../domain/repositories/FeedbacksRepositoryDTO';

import PrismaFeedbacksMapper from './PrismaFeedbacksMapper';

export default class PrismaFeedbacksRepository implements IFeedbacksRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<Feedback[]> {
    const feedbacks = await this.prismaClient.feedback.findMany({
      orderBy: {
        status: 'desc',
      },
    });

    return feedbacks.map(PrismaFeedbacksMapper.toDomain);
  }

  async create(data: CreateFeedbackDTO): Promise<Feedback> {
    const createdFeedback = await this.prismaClient.feedback.create({
      data: {
        text: data.text,
        type: PrismaFeedbacksMapper.typeToPrisma(data.type),
        authorId: data.authorId,
      },
    });

    return PrismaFeedbacksMapper.toDomain(createdFeedback);
  }
}
