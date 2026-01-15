import { Category } from '@/api/data-contracts';

/**
 * 학과 type
 */
export type department = NonNullable<Category['central']>;
/**
 * 단과대 type
 */
export type CollegeCode = NonNullable<Category['college']>;
/**
 * 중앙동아리 분과 type
 */
export type UnionCategoryCode = NonNullable<Category['union']>;
