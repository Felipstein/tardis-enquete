type Object = Record<string, string>;

export type NextPage<TParams extends Object = Object, TSearchParams extends Object = Object> = {
  params: TParams;
  searchParams: TSearchParams;
};
