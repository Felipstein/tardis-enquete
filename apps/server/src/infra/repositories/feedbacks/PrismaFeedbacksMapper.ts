import {
  FeedbackType as PrismaFeedbackType,
  FeedbackStatus as PrismaFeedbackStatus,
  Feedback as PrismaFeedback,
} from '@prisma/client';
import { FeedbackType, FeedbackStatuses as FeedbackStatus } from '@tardis-enquete/contracts';

import Feedback from '../../../domain/entities/Feedback';

export default class PrismaFeedbacksMapper {
  static toDomain(prismaFeedback: PrismaFeedback): Feedback {
    return new Feedback({
      id: prismaFeedback.id,
      text: prismaFeedback.text,
      type: this.typeToDomain(prismaFeedback.type),
      status: this.statusToDomain(prismaFeedback.status),
      authorId: prismaFeedback.authorId,
    });
  }

  static typeToDomain(prismaFeedbackType: PrismaFeedbackType): FeedbackType {
    switch (prismaFeedbackType) {
      case 'SUGGESTION':
        return 'suggestion';
      case 'BUG':
        return 'bug';
      case 'OTHER':
        return 'other';
      default:
        throw new Error(`Invalid feedback type: ${prismaFeedbackType}`);
    }
  }

  static typeToPrisma(feedbackType: FeedbackType): PrismaFeedbackType {
    switch (feedbackType) {
      case 'suggestion':
        return 'SUGGESTION';
      case 'bug':
        return 'BUG';
      case 'other':
        return 'OTHER';
      default:
        throw new Error(`Invalid feedback type: ${feedbackType}`);
    }
  }

  static statusToDomain(prismaFeedbackStatus: PrismaFeedbackStatus): FeedbackStatus {
    switch (prismaFeedbackStatus) {
      case 'OPEN':
        return 'open';
      case 'CLOSED':
        return 'closed';
      default:
        throw new Error(`Invalid feedback status: ${prismaFeedbackStatus}`);
    }
  }
}
