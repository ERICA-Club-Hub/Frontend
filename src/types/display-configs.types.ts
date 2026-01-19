import {
    CentralCategoryCode,
    CollegeCode,
    DepartmentCode,
    UnionCategoryCode,
} from './domain-category.types';
import { RecruitmentStatus } from './recruitment-status.type';

/**
 * 단과대 라벨과 이모지
 */
export interface CollegeDisplayConfig {
    code: CollegeCode;
    label: string;
    emoji: string;
}

/**
 * 중앙동아리 분과 라벨과 이모지
 */
export interface CentralCategoryDisplayConfig {
    code: CentralCategoryCode;
    label: string;
    emoji: string;
}

/**
 * 학과별 라벨과 이모지
 */
export interface DepartmentDisplayConfig {
    code: DepartmentCode;
    label: string;
}

/**
 * 연합동아리 분과 라벨과 이모지
 */
export interface UnionCategoryDisplayConfig {
    code: UnionCategoryCode;
    label: string;
    emoji: string;
}

/**
 * 리크루팅 상태별 이모지와 글자 및 배경 색
 */
export interface RecruitmentStatusDisplayConfig {
    code: RecruitmentStatus;
    label: string;
    textColor: string;
    backgroundColor: string;
}

export interface SortByDisplayConfig {
    code: string;
    label: string;
}
