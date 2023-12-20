export default class Entity<TProps extends object> {
  protected attributes: TProps;

  constructor(props: TProps) {
    this.attributes = props;
  }

  toObject(): TProps {
    const object = {} as TProps;

    for (const [key, value] of Object.entries(this.attributes)) {
      if (value instanceof Entity) {
        object[key as keyof TProps] = value.toObject();

        continue;
      }

      object[key as keyof TProps] = value;
    }

    return Object.freeze(object);
  }
}

export type EntityProps<TEntity extends Entity<TEntityProps>, TEntityProps extends object = object> = ReturnType<
  TEntity['toObject']
>;
