import { PrismaClient } from '@prisma/client';

import { pushNotification } from '../../../utils/pushNotification';

import UpdatePollUseCase from './UpdatePollUseCase';

type IInput = {
  pollId: string;
  closed: boolean;
};

type IOutput = void;

export default class ChangePollClosedStatusUseCase {
  constructor(
    private readonly updatePollUseCase: UpdatePollUseCase,
    private readonly prisma: PrismaClient,
  ) {}

  async execute({ pollId, closed }: IInput): Promise<IOutput> {
    await this.updatePollUseCase.execute({ id: pollId, closed });

    if (closed) {
      this.prisma.poll.findUniqueOrThrow({ where: { id: pollId }, select: { title: true } }).then((poll) => {
        pushNotification({
          title: `Enquete ${poll.title} fechada.`,
          description: 'A enquete foi fechada, clique aqui para visualizar as respostas',
          content: {
            urlToRedirect: `/poll/${pollId}`,
            buttonLabel: 'Acessar Enquete',
          },
          forUsers: { common: true, admin: true, developer: true },
        });
      });
    }
  }
}
