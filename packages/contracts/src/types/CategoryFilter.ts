import { Category } from './Category';

export type CategoryFilter = Pick<Category, 'id' | 'name' | 'description' | 'totalPolls'>;
