import { CategoryRequest } from '@/api/data-contracts';

/**
 * 학과 type
 */
export type DepartmentCode = NonNullable<CategoryRequest['department']>;
/**
 * 단과대 type
 */
export type CollegeCode = NonNullable<CategoryRequest['college']>;
/**
 * 연합동아리 분과 type
 */
export type UnionCategoryCode = NonNullable<CategoryRequest['union']>;
/**
 * 중앙동아리 분과 type
 */
export type CentralCategoryCode = NonNullable<CategoryRequest['central']>;

/**
 * 정렬 기준 type
 */
export type SortByCode = 'NAME_ASC' | 'CATEGORY_ASC' | 'RECRUITMENT_STATUS_ASC';
