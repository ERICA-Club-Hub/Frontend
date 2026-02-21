import { apiRequest } from '@/api/apiRequest';
import { ClubRecruitmentResponse } from '@/api/data-contracts';
import { APIResponse } from '@/types/api.types';
import { useQuery } from '@tanstack/react-query';

/**
 * 동아리 모집 안내 조회
 */
export const useClubRecruitmentQuery = ({
    clubId,
}: {
    clubId: string | undefined;
}) => {
    return useQuery({
        queryKey: ['clubs', 'recruitment', clubId],
        queryFn: async (): Promise<APIResponse<ClubRecruitmentResponse>> =>
            apiRequest({
                url: `/api/clubs/${clubId}/recruitment`,
                method: 'GET',
            }),
        staleTime: 1000 * 60 * 5,
        select: (data) => data.result,
        enabled: !!clubId,
    });
};
