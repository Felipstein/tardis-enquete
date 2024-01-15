import { PrismaClient } from '@prisma/client';

import Feedback from '../../../domain/entities/Feedback';
import IFeedbacksRepository from '../../../domain/repositories/FeedbacksRepository';
import { CreateFeedbackDTO, UpdateFeedbackDTO } from '../../../domain/repositories/FeedbacksRepositoryDTO';

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

  async findById(id: string): Promise<Feedback | null> {
    const feedback = await this.prismaClient.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      return null;
    }

    return PrismaFeedbacksMapper.toDomain(feedback);
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

  async update(id: string, data: UpdateFeedbackDTO): Promise<void> {
    await this.prismaClient.feedback.update({
      where: { id },
      data: {
        ...data,
        type: data.type && PrismaFeedbacksMapper.typeToPrisma(data.type),
        status: data.status && PrismaFeedbacksMapper.statusToPrisma(data.status),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaClient.feedback.delete({
      where: { id },
    });
  }
}
