import { SocketEventPayload } from '@tardis-enquete/contracts';

import { io } from '../../../http/app';
import Logger from '../../../infra/logger';
import PollNotExists from '../../errors/PollNotExists';
import IPollsRepository from '../../repositories/PollsRepository';

import { DeletePollUseCaseDTO } from './DeletePollUseCaseDTO';

const log = Logger.start('DELETE POLL USE CASE');

export default class DeletePollUseCase {
  constructor(private readonly pollsRepository: IPollsRepository) {}

  async execute({ pollId }: DeletePollUseCaseDTO) {
    const pollExists = await this.pollsRepository.exists(pollId);

    if (!pollExists) {
      throw new PollNotExists();
    }

    await this.pollsRepository.delete(pollId);

    if (process.env.NODE_ENV !== 'test') {
      log.verbose.info('Emitting socket event (poll delete), poll id:', pollId);

      io.emit('pollDelete', { pollId } as SocketEventPayload<'pollDelete'>);
    }
  }
}
