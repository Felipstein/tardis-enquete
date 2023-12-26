export type OmitTyped<T extends object, P extends keyof T> = Omit<T, P>;
