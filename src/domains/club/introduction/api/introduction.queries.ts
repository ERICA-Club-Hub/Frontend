import { apiRequest } from '@/api/apiRequest';
import { ClubDetailResponse } from '@/api/data-contracts';
import { APIResponse } from '@/types/api.types';
import { useQuery } from '@tanstack/react-query';

/**
 * 동아리 상세 정보 조회 (동아리 소개)
 */
export const useClubIntroQuery = (clubId?: string) => {
    return useQuery({
        queryKey: ['clubs', 'introduction', clubId],
        queryFn: async (): Promise<APIResponse<ClubDetailResponse>> =>
            apiRequest({
                url: `/api/clubs/${clubId}`,
                method: 'GET',
            }),
        staleTime: 1000 * 60 * 5,
        select: (data) => data.result,
        enabled: !!clubId,
    });
};
