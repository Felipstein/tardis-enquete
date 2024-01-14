import { SendFeedbackResponse } from '@tardis-enquete/contracts';

import { CreateFeedbackDTO } from '../../repositories/FeedbacksRepositoryDTO';

export type SendFeedbackUseCaseDTO = CreateFeedbackDTO;

export type SendFeedbackUseCaseReturn = SendFeedbackResponse['feedbackId'];
