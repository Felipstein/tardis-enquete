import UserService from '../../../services/UserService';
import Conflict from '../../errors/Conflict';
import FeedbacksRepository from '../../repositories/FeedbacksRepository';

import { ListFeedbacksUseCaseReturn } from './ListFeedbacksUseCaseDTO';

export default class ListFeedbacksUseCase {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly usersService: UserService,
  ) {}

  async execute(): Promise<ListFeedbacksUseCaseReturn> {
    const feedbacks = await this.feedbacksRepository.findAll();

    const feedbacksPopuledPromises = feedbacks.map(async (feedbackWithAuthorId) => {
      const { authorId, ...feedback } = feedbackWithAuthorId.toObject();

      const author = await this.usersService.findById(authorId);

      if (!author) {
        throw new Conflict(`Usuário com o id ${authorId} não existe`);
      }

      return {
        ...feedback,
        author: {
          id: author.id,
          username: author.username,
          globalName: author.globalName,
          avatar: author.avatar,
        },
      } satisfies ListFeedbacksUseCaseReturn[number];
    });

    return Promise.all(feedbacksPopuledPromises);
  }
}
