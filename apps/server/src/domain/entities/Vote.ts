import Entity from './core/Entity';

interface VoteProps {
  id: string;
  optionId: string;
  userId: string;
}

export default class Vote extends Entity<VoteProps> {
  get id() {
    return this.attributes.id;
  }

  get optionId() {
    return this.attributes.optionId;
  }

  get userId() {
    return this.attributes.userId;
  }
}
