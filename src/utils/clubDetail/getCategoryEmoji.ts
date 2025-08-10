export const CATEGORIES = {
    UNION: { label: '연합동아리', emoji: '🧩' },
    ART: { label: '예술분과', emoji: '🎨' },
    VOLUNTEER: { label: '봉사분과', emoji: '💌' },
    ACADEMIC: { label: '학술교양분과', emoji: '🎓' },
    SPORTS: { label: '체육분과', emoji: '⚽' },
    RELIGION: { label: '종교분과', emoji: '🙏' },
};

export type Category = keyof typeof CATEGORIES;

export const getCategoryMapping = (category: Category): string => {
    return CATEGORIES[category].label;
};

export const getCategoryEmoji = (category: Category): string => {
    return CATEGORIES[category].emoji;
};

export const getCategoryInfo = (category: Category) => {
    return CATEGORIES[category];
};
