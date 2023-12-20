import Entity from './core/Entity';

interface OptionProps {
  id: string;
  text: string;
  pollId: string;
}

export default class Option extends Entity<OptionProps> {
  get id() {
    return this.attributes.id;
  }

  get text() {
    return this.attributes.text;
  }

  set text(text: string) {
    this.attributes.text = text;
  }

  get pollId() {
    return this.attributes.pollId;
  }
}
