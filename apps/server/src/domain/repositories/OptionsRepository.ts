import Option from '../entities/Option';

export default interface IOptionsRepository {
  findOptionsOfPoll(pollId: string): Promise<Option[]>;

  findOptionVotedByUserInPoll(userId: string, pollId: string): Promise<Option | null>;

  findById(optionId: string): Promise<Option | null>;

  createMany(pollId: string, options: string[]): Promise<Option[]>;

  deleteOptionsOfPoll(pollId: string): Promise<void>;
}
