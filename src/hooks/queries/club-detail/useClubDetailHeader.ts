import { apiRequest } from '@/api/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { ClubOverviewResponse } from '@/api/data-contracts';

export const useClubDetailHeader = (clubId: string, isPreview: boolean) => {
    return useQuery({
        queryKey: ['clubDetailHeader', clubId, isPreview],
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
            throw new Error('동아리 오버뷰 불러오기 실패');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!clubId && clubId.trim() !== '',
    });
};
