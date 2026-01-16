import { Category } from '@/api/data-contracts';

/**
 * 학과 type
 */
export type DepartmentCode = NonNullable<Category['department']>;
/**
 * 단과대 type
 */
export type CollegeCode = NonNullable<Category['college']>;
/**
 * 연합동아리 분과 type
 */
export type UnionCategoryCode = NonNullable<Category['union']>;
/**
 * 중앙동아리 분과 type
 */
export type CentralCategoryCode = NonNullable<Category['central']>;

/**
 * 정렬 기준 type
 */
export type SortByCode = 'NAME_ASC' | 'CATEGORY_ASC' | 'RECRUITMENT_STATUS_ASC';
