import BadRequest from '../errors/BadRequest';

import Entity from './core/Entity';

interface PollProps {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  expireAt: Date;
  authorId: string;
}

export default class Poll extends Entity<PollProps> {
  get id() {
    return this.attributes.id;
  }

  get title() {
    return this.attributes.title;
  }

  set title(title: string) {
    this.attributes.title = title;
  }

  get description() {
    return this.attributes.description;
  }

  set description(description: string) {
    this.attributes.description = description;
  }

  get createdAt() {
    return this.attributes.createdAt;
  }

  get expireAt() {
    return this.attributes.expireAt;
  }

  set expireAt(expireAt: Date) {
    if (expireAt < this.createdAt) {
      throw new BadRequest('A data de expiração deve ser posterior a data de criação');
    }

    this.attributes.expireAt = expireAt;
  }

  get authorId() {
    return this.attributes.authorId;
  }

  isExpired() {
    return this.expireAt < new Date();
  }
}
