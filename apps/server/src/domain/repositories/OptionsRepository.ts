import Option from '../entities/Option';

export default interface IOptionsRepository {
  findOptionVotedByUserInPoll(userId: string, pollId: string): Promise<Option | null>;

  findById(optionId: string): Promise<Option | null>;
}
