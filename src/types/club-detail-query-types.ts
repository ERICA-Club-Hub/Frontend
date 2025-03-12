// 동아리 상태 타입
type RecruitmentStatus = 'UPCOMING' | 'OPEN' | 'CLOSED';

// 동아리 정보 요약 인터페이스
export interface ClubSummary {
    name: string;
    description: string;
    category: string;
    leaderName: string;
    leaderPhone: string;
    activities: string;
    membershipFee: string;
    snsUrl: string;
    recruitmentStatus: RecruitmentStatus;
    applicationUrl: string;
    profileImageUrl: string;
}
