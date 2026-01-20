export type ClubType = 'CENTRAL' | 'UNION' | 'COLLEGE' | 'DEPARTMENT';

export interface ClubTypeConfig {
    code: ClubType;
    label: string;
    value: string; // URL에서 사용하는 값(dropdown에 따라 바꿀 때)
}

export const CLUB_TYPE_DISPLAYS: Record<ClubType, ClubTypeConfig> = {
    CENTRAL: { code: 'CENTRAL', label: '중앙동아리', value: 'central' },
    UNION: { code: 'UNION', label: '연합동아리', value: 'union' },
    COLLEGE: { code: 'COLLEGE', label: '단과대동아리', value: 'college' },
    DEPARTMENT: {
        code: 'DEPARTMENT',
        label: '학과동아리',
        value: 'department',
    },
};
