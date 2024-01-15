import CloseFeedbackUseCase from '../../../domain/useCases/feedbacks/CloseFeedbackUseCase';
import DeleteFeedbackUseCase from '../../../domain/useCases/feedbacks/DeleteFeedbackUseCase';
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

const closeFeedbackUseCase = new CloseFeedbackUseCase(factoryFeedbacksRepository());

export function factoryCloseFeedbackUseCase() {
  return closeFeedbackUseCase;
}

const deleteFeedbackUseCase = new DeleteFeedbackUseCase(factoryFeedbacksRepository());

export function factoryDeleteFeedbackUseCase() {
  return deleteFeedbackUseCase;
}
