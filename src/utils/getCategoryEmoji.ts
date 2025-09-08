// 카테고리 매핑 함수
export const getCategoryMapping = (category: string) => {
    const categoryMap: { [key: string]: string } = {
        SPORTS: '체육분과',
        ART: '예술분과',
        VOLUNTEER: '봉사분과',
        ACADEMIC: '학술교양분과',
        RELIGION: '종교분과',
        UNION: '연합동아리',
    };
    return categoryMap[category] || category;
};

// 카테고리별 이모지 매핑 함수
export const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
        연합동아리: '🧩',
        예술분과: '🎨',
        봉사분과: '💌',
        학술교양분과: '🎓',
        체육분과: '⚽',
        종교분과: '🙏',
    };
    return emojiMap[category] || '📌';
};
