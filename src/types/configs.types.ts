import {
    CentralCategoryCode,
    CollegeCode,
    DepartmentCode,
    UnionCategoryCode,
} from './category.types';
import { RecruitmentStatus } from './recruitment-status.type';

/**
 * 단과대 라벨과 이모지
 */
export interface CollegeConfig {
    code: CollegeCode;
    label: string;
    emoji: string;
}

/**
 * 중앙동아리 분과 라벨과 이모지
 */
export interface CentralCategoryConfig {
    code: CentralCategoryCode;
    label: string;
    emoji: string;
}

/**
 * 학과별 라벨과 이모지
 */
export interface DepartmentConfig {
    code: DepartmentCode;
    label: string;
}

/**
 * 연합동아리 분과 라벨과 이모지
 */
export interface UnionCategoryConfig {
    code: UnionCategoryCode;
    label: string;
    emoji: string;
}

/**
 * 리크루팅 상태별 이모지와 글자 및 배경 색
 */
export interface RecruitmentStatusConfig {
    code: RecruitmentStatus;
    label: string;
    textColor: string;
    backgroundColor: string;
}

export interface SortByConfig {
    code: string;
    label: string;
}
