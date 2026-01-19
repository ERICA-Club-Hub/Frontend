import {
    CENTRAL_CATEGORY_DISPLAYS,
    COLLEGE_DEPARTMENT_MAPPING,
    COLLEGE_DISPLAYS,
    DEPARTMENT_DISPLAYS,
    UNION_CATEGORY_DISPLAYS,
} from '@/constants/category-config.constant';
import {
    CentralCategoryCode,
    CollegeCode,
    DepartmentCode,
    UnionCategoryCode,
} from '@/types/domain-category.types';

export interface CategoryOption {
    value: CentralCategoryCode | UnionCategoryCode;
    label: string;
}

export interface DepartmentInfo {
    code: DepartmentCode;
    name: string;
}

export interface CollegeInfo {
    code: CollegeCode;
    name: string;
}

// 드롭다운용 옵션 생성 (이모지 제외)
export const getCollegeOptionsNameOnly = (): {
    value: CollegeCode;
    label: string;
}[] => {
    return Object.values(COLLEGE_DISPLAYS).map((config) => ({
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
    if (!collegeCode || !(collegeCode in COLLEGE_DISPLAYS)) {
        return [];
    }

    const departments =
        COLLEGE_DEPARTMENT_MAPPING[collegeCode as CollegeCode] || [];
    return departments.map((dept) => ({
        value: dept,
        label: DEPARTMENT_DISPLAYS[dept].label,
    }));
};

export const getCentralCategoryOptionsNameOnly = (): {
    value: CentralCategoryCode;
    label: string;
}[] => {
    return Object.values(CENTRAL_CATEGORY_DISPLAYS).map((config) => ({
        value: config.code,
        label: config.label,
    }));
};

export const getUnionCategoryOptionsNameOnly = (): {
    value: UnionCategoryCode;
    label: string;
}[] => {
    return Object.values(UNION_CATEGORY_DISPLAYS).map((config) => ({
        value: config.code,
        label: config.label,
    }));
};
