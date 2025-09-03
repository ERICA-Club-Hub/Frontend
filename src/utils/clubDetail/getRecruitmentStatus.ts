const RECRUITMENT_STATUS = {
    CLOSED: {
        label: '모집마감',
        backgroundColor: 'rgba(247, 247, 247, 1)',
        textColor: 'rgba(96, 96, 96, 1)',
    },
    OPEN: {
        label: '모집중',
        backgroundColor: 'rgba(255, 244, 228, 1)',
        textColor: 'rgba(240, 138, 0, 1)',
    },
    UPCOMING: {
        label: '모집예정',
        backgroundColor: 'rgba(241, 249, 220, 1)',
        textColor: 'rgba(139, 180, 33, 1)',
    },
    // TODO 서비스 질문 서버 필드명 확정되면 추가
};

export type RecruitmentStatus = keyof typeof RECRUITMENT_STATUS;

const isRecruitmentStatusKey = (
    status: string,
): status is RecruitmentStatus => {
    return status in RECRUITMENT_STATUS;
};

export const getRecruitmentStatusLabel = (status?: string): string => {
    if (!status) return '상태 없음';

    if (isRecruitmentStatusKey(status)) {
        return RECRUITMENT_STATUS[status].label;
    }

    return '알 수 없는 상태';
};

export const getRecruitmentStatusStyle = (status?: string) => {
    if (!status || !isRecruitmentStatusKey(status)) {
        return {
            backgroundColor: 'rgba(247, 247, 247, 1)',
            textColor: 'rgba(96, 96, 96, 1)',
        };
    }

    return {
        backgroundColor: RECRUITMENT_STATUS[status].backgroundColor,
        textColor: RECRUITMENT_STATUS[status].textColor,
    };
};

export const getRecruitmentStatusInfo = (status?: string) => {
    if (!status)
        return {
            label: '상태 없음',
            backgroundColor: 'rgba(247, 247, 247, 1)',
            textColor: 'rgba(96, 96, 96, 1)',
        };

    if (isRecruitmentStatusKey(status)) {
        return RECRUITMENT_STATUS[status];
    }

    return {
        label: '알 수 없는 상태',
        backgroundColor: 'rgba(247, 247, 247, 1)',
        textColor: 'rgba(96, 96, 96, 1)',
    };
};
