import {
    CENTRAL_CATEGORY,
    COLLEGE_DEPARTMENT_MAPPING,
    COLLEGES,
    DEPARTMENTS,
    RECRUITMENT_STATUS,
    UNION_CATEGORY,
} from '@/constants/category-config.constant';
import {
    CentralCategoryCode,
    CollegeCode,
    DepartmentCode,
    UnionCategoryCode,
} from '@/types/category.types';
import { RecruitmentStatus } from '@/types/recruitment-status.type';

/**
 *
 * @param code 단과대학 서버 code
 * @returns 한글 단과대명
 */
export const getCollegeLabel = (code: CollegeCode): string => {
    return COLLEGES[code]?.label || code;
};

/**
 *
 * @param code 단과대학 서버 code
 * @returns 단과대별 이모지
 */
export const getCollegeEmoji = (code: CollegeCode): string => {
    return COLLEGES[code]?.emoji || '';
};

/**
 *
 * @param code 단과대학 서버 code
 * @returns `${단과대학 이모지}` + `${한글 단과대명}`
 */
export const getCollegeDisplay = (code: CollegeCode): string => {
    const config = COLLEGES[code];
    return config ? `${config.emoji} ${config.label}` : code;
};

/**
 *
 * @param code 학과 서버 code
 * @returns 한글 학과명
 */
export const getDepartmentLabel = (code: DepartmentCode): string => {
    return DEPARTMENTS[code]?.label || code;
};

/**
 *
 * @param name 한글 단과대학명
 * @returns 단과대학 code 반환
 */
export const getCollegeCodeByName = (name: string): CollegeCode | null => {
    const entry = Object.entries(COLLEGES).find(
        ([, config]) => config.label === name || config.label.includes(name),
    );
    return entry ? (entry[0] as CollegeCode) : null;
};

/**
 *
 * @param name 한글 학과명
 * @returns 학과 code 반환
 */
export const getDepartmentCodeByName = (
    name: string,
): DepartmentCode | null => {
    const entry = Object.entries(DEPARTMENTS).find(
        ([, config]) => config.label === name || config.label.includes(name),
    );
    return entry ? (entry[0] as DepartmentCode) : null;
};

/**
 *
 * @param collegeCode 단과대학 code
 * @returns 해당 단과대학의 학과 옵션 반환
 */
export const getDepartmentsByCollege = (
    collegeCode: CollegeCode,
): Array<{ code: DepartmentCode; label: string }> => {
    const departments = COLLEGE_DEPARTMENT_MAPPING[collegeCode] || [];
    return departments.map((code) => DEPARTMENTS[code]);
};

/**
 *
 * @param deptCode 학과 code
 * @returns 해당 학과가 속한 단과대학의 emoji
 */
const getDepartmentEmoji = (deptCode: DepartmentCode): string => {
    // 단과대 - 학과 매핑에서 역으로 찾기
    for (const [collegeCode, deptCodes] of Object.entries(
        COLLEGE_DEPARTMENT_MAPPING,
    )) {
        if (deptCodes.includes(deptCode)) {
            return COLLEGES[collegeCode as CollegeCode].emoji;
        }
    }
    return '📁'; // 매칭 안 되면 기본값
};

/**
 * 카테고리 코드로 이모지 가져오기 (타입 안전)
 */
export const getCentralCategoryEmoji = (code: CentralCategoryCode): string => {
    return CENTRAL_CATEGORY[code]?.emoji || '📁';
};

export const getUnionCategoryEmoji = (): string => {
    return '🧩';
};

/**
 * 카테고리 코드로 전체 디스플레이 정보 가져오기
 */
export const getCategoryDisplay = (code: CentralCategoryCode): string => {
    const config = CENTRAL_CATEGORY[code];
    return config
        ? `${config.emoji} ${config.label}`
        : '📁 알 수 없는 카테고리';
};

interface CategoryConfig {
    label: string;
    emoji: string;
}

type ClubCategoryCode =
    | CentralCategoryCode
    | UnionCategoryCode
    | CollegeCode
    | DepartmentCode;

export const getCategoryConfig = (
    categoryCode?: ClubCategoryCode,
): CategoryConfig => {
    if (!categoryCode) {
        return { label: '', emoji: '📁' };
    }

    // 중앙동아리 분과 체크
    if (categoryCode in CENTRAL_CATEGORY) {
        const config = CENTRAL_CATEGORY[categoryCode as CentralCategoryCode];
        return { label: config.label, emoji: config.emoji };
    }

    // 연합동아리 분과 체크
    if (categoryCode in UNION_CATEGORY) {
        const config = UNION_CATEGORY[categoryCode as UnionCategoryCode];
        return { label: config.label, emoji: config.emoji || '🧩' };
    }

    // 단과대 체크
    if (categoryCode in COLLEGES) {
        const config = COLLEGES[categoryCode as CollegeCode];
        return { label: config.label, emoji: config.emoji };
    }

    // 학과 체크
    if (categoryCode in DEPARTMENTS) {
        const config = DEPARTMENTS[categoryCode as DepartmentCode];
        return {
            label: config.label,
            emoji: getDepartmentEmoji(categoryCode as DepartmentCode),
        };
    }

    return { label: '', emoji: '📁' };
};

interface RecruitmentConfig {
    label: string;
    backgroundColor: string;
    textColor: string;
}

/**
 * 모집 상태 코드로 디스플레이 정보 가져오기
 */
export const getRecruitmentConfig = (
    status?: RecruitmentStatus,
): RecruitmentConfig => {
    if (!status) {
        return {
            label: '상태 없음',
            backgroundColor: 'bg-badge-gray-bg',
            textColor: 'text-badge-gray-text',
        };
    }

    const config = RECRUITMENT_STATUS[status];
    return config
        ? {
              label: config.label,
              backgroundColor: config.backgroundColor,
              textColor: config.textColor,
          }
        : {
              label: '상태 없음',
              backgroundColor: 'bg-badge-gray-bg',
              textColor: 'text-badge-gray-text',
          };
};
