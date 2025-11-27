export type TabCategory =
    | '중앙동아리'
    | '단과대동아리'
    | '학과동아리'
    | '연합동아리';

export const TAB_MAPPING = [
    { label: '중앙동아리', value: 'central' },
    { label: '단과대동아리', value: 'college' },
    { label: '학과동아리', value: 'department' },
    { label: '연합동아리', value: 'union' },
];

export function isValidCategory(value: string | null): value is TabCategory {
    return (
        value === '중앙동아리' ||
        value === '단과대동아리' ||
        value === '학과동아리' ||
        value === '연합동아리'
    );
}

export const getServerTabValue = (label: TabCategory): string => {
    return TAB_MAPPING.find((item) => item.label === label)?.value || 'central';
};

export const getDisplayLabel = (serverValue: string): TabCategory => {
    return (
        (TAB_MAPPING.find((item) => item.value === serverValue)
            ?.label as TabCategory) || '중앙동아리'
    );
};
