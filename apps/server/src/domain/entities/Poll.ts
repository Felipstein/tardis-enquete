import BadRequest from '../errors/BadRequest';

import Entity from './core/Entity';

interface PollProps {
  id: string;
  title: string;
  description: string | null;
  categoryId: string | null;
  createdAt: Date;
  expireAt: Date | null;
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

  set description(description: string | null) {
    this.attributes.description = description;
  }

  get categoryId() {
    return this.attributes.categoryId;
  }

  set categoryId(categoryId: string | null) {
    this.attributes.categoryId = categoryId;
  }

  get createdAt() {
    return this.attributes.createdAt;
  }

  get expireAt() {
    return this.attributes.expireAt;
  }

  set expireAt(expireAt: Date | null) {
    if (expireAt && expireAt < this.createdAt) {
      throw new BadRequest('A data de expiração deve ser posterior a data de criação');
    }

    this.attributes.expireAt = expireAt;
  }

  get authorId() {
    return this.attributes.authorId;
  }

  isExpired() {
    return this.expireAt && this.expireAt < new Date();
  }

  neverExpire() {
    return this.expireAt === null;
  }
}
