export default function useClubDetail() {
    const useClubDetailSummary = () => {}; // 동아리 정보 요약
    const useClubSchedule = () => {}; // 동아리 연간 일정
    const useClubIntroduction = () => {}; // 동아리 소개
    const useClubRecruitment = () => {}; // 동아리 모집 안내
    const useClubActivityLog = () => {}; // 동아리 활동 로그
    const useClubActivity = () => {}; // 활동 로그 하나
    return {
        useClubDetailSummary,
        useClubSchedule,
        useClubIntroduction,
        useClubRecruitment,
        useClubActivityLog,
        useClubActivity,
    };
}
