import UpdatePollUseCase from './UpdatePollUseCase';

type IInput = {
  pollId: string;
  closed: boolean;
};

type IOutput = void;

export default class ChangePollClosedStatusUseCase {
  constructor(private readonly updatePollUseCase: UpdatePollUseCase) {}

  async execute({ pollId, closed }: IInput): Promise<IOutput> {
    await this.updatePollUseCase.execute({ id: pollId, closed });
  }
}
