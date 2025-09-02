export type TabCategory = '중앙동아리' | '단과대' | '학과' | '연합동아리';

export const TAB_MAPPING = [
    { label: '중앙동아리', value: 'central' },
    { label: '단과대', value: 'college' },
    { label: '학과', value: 'department' },
    { label: '연합동아리', value: 'union' },
];

export function isValidCategory(value: string | null): value is TabCategory {
    return (
        value === '중앙동아리' ||
        value === '단과대' ||
        value === '학과' ||
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
