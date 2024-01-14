import { FeedbackStatuses, FeedbackType } from '@tardis-enquete/contracts';

import Entity from './core/Entity';

interface FeedbackProps {
  id: string;
  text: string;
  type: FeedbackType;
  status: FeedbackStatuses;
  authorId: string;
}

export default class Feedback extends Entity<FeedbackProps> {
  get id() {
    return this.attributes.id;
  }

  get text() {
    return this.attributes.text;
  }

  get type() {
    return this.attributes.type;
  }

  get status() {
    return this.attributes.status;
  }

  get authorId() {
    return this.attributes.authorId;
  }
}
