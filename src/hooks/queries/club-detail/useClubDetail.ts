import { apiRequest } from '@/api/apiRequest';
import { useQuery } from '@tanstack/react-query';

export default function useClubDetail() {
    const useClubDetailSummary = (id: string) => {
        // 동아리 정보 요약
        const { isPending, isSuccess, data, isError } = useQuery({
            queryKey: ['club', 'summary', id],
            queryFn: async () => {
                const response = await apiRequest({ url: `/api/clubs/${id}` });
                return response.result;
            },
        });
        return { isPending, isSuccess, data, isError };
    };
    const useClubSchedule = (id: string) => {
        // 동아리 연간 일정
        const { isPending, isSuccess, data, isError } = useQuery({
            queryKey: ['club', 'schedule', id],
            queryFn: async () => {
                const response = await apiRequest({
                    url: `/api/clubs/${id}/schedules`,
                });
                return response.result;
            },
        });
        return { isPending, isSuccess, data, isError };
    };
    const useClubIntroduction = (id: string) => {
        // 동아리 소개
        const { isPending, isSuccess, data, isError } = useQuery({
            queryKey: ['club', 'intro', id],
            queryFn: async () => {
                const response = await apiRequest({
                    url: `/api/clubs/${id}/introduction`,
                });
                return response.result;
            },
        });
        return { isPending, isSuccess, data, isError };
    };
    const useClubRecruitment = (id: string) => {
        // 동아리 모집 안내
        const { isPending, isSuccess, data, isError } = useQuery({
            queryKey: ['club', 'intro', id],
            queryFn: async () => {
                const response = await apiRequest({
                    url: `/api/clubs/${id}/recruitment`,
                });
                return response.result;
            },
        });
        return { isPending, isSuccess, data, isError };
    };
    const useClubActivityLog = (id: string) => {
        // 동아리 활동 로그
        const { isPending, isSuccess, data, isError } = useQuery({
            queryKey: ['club', 'activities', id],
            queryFn: async () => {
                const response = await apiRequest({
                    url: `/api/activities/club/${id}`,
                });
                return response.result;
            },
        });
        return { isPending, isSuccess, data, isError };
    };
    const useClubActivity = (activityId: string) => {
        // 활동 로그 상세
        const { isPending, isSuccess, data, isError } = useQuery({
            queryKey: ['club', 'activity', activityId],
            queryFn: async () => {
                const response = await apiRequest({
                    url: `/api/activities/${activityId}`,
                });
                return response.result;
            },
        });
        return { isPending, isSuccess, data, isError };
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
