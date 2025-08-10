export const RECRUITMENT_STATUS = {
    CLOSED: '모집마감',
    OPEN: '모집중',
    UPCOMING: '모집예정',
};

export type RecruitmentStatus = keyof typeof RECRUITMENT_STATUS;

export const getRecruitmentStatus = (
    recruitmentStatus: RecruitmentStatus,
): string => {
    return RECRUITMENT_STATUS[recruitmentStatus];
};
