import { CLUB_TYPE_DISPLAYS } from '@/constants/dropdown-option-config.constant';

export type TabCategory =
    | '중앙동아리'
    | '단과대동아리'
    | '학과동아리'
    | '연합동아리';

export function isValidCategory(value: string | null): value is TabCategory {
    if (!value) return false;
    return Object.values(CLUB_TYPE_DISPLAYS).some(
        (config) => config.label === value,
    );
}

export const getServerTabValue = (label: TabCategory): string => {
    const entry = Object.values(CLUB_TYPE_DISPLAYS).find(
        (config) => config.label === label,
    );
    return entry?.value || 'central';
};

export const getClubCategoryLabel = (serverValue: string): TabCategory => {
    const entry = Object.values(CLUB_TYPE_DISPLAYS).find(
        (config) => config.value === serverValue,
    );
    return (entry?.label as TabCategory) || '중앙동아리';
};
