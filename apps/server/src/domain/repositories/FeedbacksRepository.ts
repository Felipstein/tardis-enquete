import Feedback from '../entities/Feedback';

import { CreateFeedbackDTO } from './FeedbacksRepositoryDTO';

export default interface IFeedbacksRepository {
  findAll(): Promise<Feedback[]>;

  create(data: CreateFeedbackDTO): Promise<Feedback>;
}
