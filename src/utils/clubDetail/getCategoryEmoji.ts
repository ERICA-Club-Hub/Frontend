const CATEGORIES = {
    UNION: { label: '연합동아리', emoji: '🧩' },
    ART: { label: '예술분과', emoji: '🎨' },
    VOLUNTEER: { label: '봉사분과', emoji: '💌' },
    ACADEMIC: { label: '학술교양분과', emoji: '🎓' },
    SPORTS: { label: '체육분과', emoji: '⚽' },
    RELIGION: { label: '종교분과', emoji: '🙏' },
};

export type Category = keyof typeof CATEGORIES;

const isCategoryKey = (category: string): category is Category => {
    return category in CATEGORIES;
};

export const getCategoryMapping = (category?: string): string => {
    if (!category) return '카테고리 없음';

    if (isCategoryKey(category)) {
        return CATEGORIES[category].label;
    }

    return '알 수 없는 카테고리';
};

export const getCategoryEmoji = (category?: string): string => {
    if (!category) return '📁';

    if (isCategoryKey(category)) {
        return CATEGORIES[category].emoji;
    }

    return '📁';
};

export const getCategoryInfo = (category?: string) => {
    if (!category) return { label: '카테고리 없음', emoji: '📁' };

    if (isCategoryKey(category)) {
        return CATEGORIES[category];
    }

    return { label: '알 수 없는 카테고리', emoji: '📁' };
};
