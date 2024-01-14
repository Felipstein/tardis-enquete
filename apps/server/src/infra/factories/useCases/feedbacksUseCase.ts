import ListFeedbacksUseCase from '../../../domain/useCases/feedbacks/ListFeedbacksUseCase';
import SendFeedbackUseCase from '../../../domain/useCases/feedbacks/SendFeedbackUseCase';
import { factoryFeedbacksRepository } from '../repositories';
import { factoryUserService } from '../services';

const listFeedbacksUseCase = new ListFeedbacksUseCase(factoryFeedbacksRepository(), factoryUserService());

export function factoryListFeedbacksUseCase() {
  return listFeedbacksUseCase;
}

const sendFeedbackUseCase = new SendFeedbackUseCase(factoryFeedbacksRepository());

export function factorySendFeedbackUseCase() {
  return sendFeedbackUseCase;
}
