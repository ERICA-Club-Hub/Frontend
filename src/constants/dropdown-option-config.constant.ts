import { ClubType } from '@/types/category.types';
import { CLUB_TYPE } from './category-config.constant';

export interface ClubTypeConfig {
    code: ClubType;
    label: string;
    value: string; // URL에서 사용하는 값(dropdown에 따라 바꿀 때)
}

export const CLUB_TYPE_DISPLAYS: Record<ClubType, ClubTypeConfig> = {
    CENTRAL: {
        code: CLUB_TYPE.CENTRAL,
        label: '중앙동아리',
        value: 'central',
    },
    UNION: { code: CLUB_TYPE.UNION, label: '연합동아리', value: 'union' },
    COLLEGE: {
        code: CLUB_TYPE.COLLEGE,
        label: '단과대동아리',
        value: 'college',
    },
    DEPARTMENT: {
        code: CLUB_TYPE.DEPARTMENT,
        label: '학과동아리',
        value: 'department',
    },
};
