import { apiRequest } from '@/api/apiRequest';
import { ClubOverviewResponse } from '@/api/data-contracts';
import { useQuery } from '@tanstack/react-query';

/**
 * 동아리 프로필 정보 조회 e.g. 동아리 이름, 모집 상태, 한 줄 소개 등
 */
export const useClubOverviewQuery = ({
    clubId,
    isPreview = false,
}: {
    clubId: string | undefined;
    isPreview: boolean;
}) => {
    return useQuery({
        queryKey: ['clubs', 'profile', clubId, { isPreview }],
        queryFn: async (): Promise<ClubOverviewResponse> => {
            const requestUrl = isPreview
                ? `/api/clubs/club-admin/${clubId}/draft`
                : `/api/clubs/${clubId}/overview`;

            const response = await apiRequest({
                url: requestUrl,
                requireToken: isPreview,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error('동아리 정보를 불러오는데 실패했습니다.');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!clubId && clubId.trim() !== '',
    });
};
