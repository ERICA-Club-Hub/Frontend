import { apiRequest } from '@/api/apiRequest';
import {
    ApiResponseGetAllActivityResponse,
    ApiResponseGetSpecificActivityResponse,
} from '@/api/data-contracts';
import { useQuery } from '@tanstack/react-query';

export const useActivityLogList = (clubId: string) => {
    return useQuery({
        queryKey: ['activityLogs', clubId],
        queryFn: async (): Promise<ApiResponseGetAllActivityResponse> => {
            const response = await apiRequest({
                url: `/api/activities/club/${clubId}`,
            });
            if (response.isSuccess) {
                return response;
            }
            throw new Error('동아리 활동 로그 리스트 불러오기 실패');
        },
        enabled: !!clubId,
        staleTime: 5 * 60 * 1000,
    });
};

export const useActivityLogDetail = (activityId: string) => {
    return useQuery({
        queryKey: ['activityLog', activityId],
        queryFn: async (): Promise<ApiResponseGetSpecificActivityResponse> => {
            const response = await apiRequest({
                url: `/api/activities/${activityId}`,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error('활동 로그 상세 불러오기 실패');
        },
        enabled: !!activityId,
        staleTime: 5 * 60 * 1000,
    });
};
