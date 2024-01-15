import Feedback from '../entities/Feedback';

import { CreateFeedbackDTO, UpdateFeedbackDTO } from './FeedbacksRepositoryDTO';

export default interface IFeedbacksRepository {
  findAll(): Promise<Feedback[]>;

  findById(id: string): Promise<Feedback | null>;

  create(data: CreateFeedbackDTO): Promise<Feedback>;

  update(id: string, data: UpdateFeedbackDTO): Promise<void>;

  delete(id: string): Promise<void>;
}
