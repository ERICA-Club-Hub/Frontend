import {
    CENTRAL_CATEGORY,
    CLUB_TYPES,
    COLLEGE_DEPARTMENT_MAPPING,
    COLLEGES,
    DEPARTMENTS,
    UNION_CATEGORY,
} from '@/constants/category-config.constant';
import {
    CentralCategoryCode,
    CollegeCode,
    DepartmentCode,
    UnionCategoryCode,
} from '@/types/category.types';

export interface CategoryOption {
    value: CentralCategoryCode | UnionCategoryCode;
    label: string;
}

/**
 * ClubType 드롭다운용 옵션 생성
 */
export const getClubTypeOptions = () => {
    return Object.values(CLUB_TYPES).map((config) => ({
        value: config.code,
        label: config.label,
    }));
};

// 드롭다운용 옵션 생성 (이모지 제외)
export const getCollegeOptionsNameOnly = (): {
    value: CollegeCode;
    label: string;
}[] => {
    return Object.values(COLLEGES).map((config) => ({
        value: config.code,
        label: config.label,
    }));
};

export const getDepartmentOptionsNameOnly = (
    collegeCode?: string,
): {
    value: DepartmentCode;
    label: string;
}[] => {
    if (!collegeCode || !(collegeCode in COLLEGES)) {
        return [];
    }

    const departments =
        COLLEGE_DEPARTMENT_MAPPING[collegeCode as CollegeCode] || [];
    return departments.map((dept) => ({
        value: dept,
        label: DEPARTMENTS[dept].label,
    }));
};

export const getCentralCategoryOptionsNameOnly = (): {
    value: CentralCategoryCode;
    label: string;
}[] => {
    return Object.values(CENTRAL_CATEGORY).map((config) => ({
        value: config.code,
        label: config.label,
    }));
};

export const getUnionCategoryOptionsNameOnly = (): {
    value: UnionCategoryCode;
    label: string;
}[] => {
    return Object.values(UNION_CATEGORY).map((config) => ({
        value: config.code,
        label: config.label,
    }));
};
