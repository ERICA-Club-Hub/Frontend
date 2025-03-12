import { apiRequest } from '@/api/apiRequest';
import { useQuery } from '@tanstack/react-query';

export default function useClubDetail() {
    const useClubDetailSummary = (id: string) => {
        // 동아리 정보 요약
        return useQuery({
            queryKey: ['club', 'summary', id],
            queryFn: async () => {
                const response = await apiRequest({ url: `/api/clubs/${id}` });

                return response.result;
            },
            staleTime: 5 * 60 * 1000,
        });
    };
    const useClubSchedule = () => {
        // 동아리 연간 일정
        const { isPending, isSuccess, data, isError } = useQuery({});
    };
    const useClubIntroduction = () => {
        // 동아리 소개
        const { isPending, isSuccess, data, isError } = useQuery({});
    };
    const useClubRecruitment = () => {
        // 동아리 모집 안내
        const { isPending, isSuccess, data, isError } = useQuery({});
    };
    const useClubActivityLog = () => {
        // 동아리 활동 로그
        const { isPending, isSuccess, data, isError } = useQuery({});
    };
    const useClubActivity = () => {
        // 활동 로그 하나
        const { isPending, isSuccess, data, isError } = useQuery({});
    };
    return {
        useClubDetailSummary,
        useClubSchedule,
        useClubIntroduction,
        useClubRecruitment,
        useClubActivityLog,
        useClubActivity,
    };
}
