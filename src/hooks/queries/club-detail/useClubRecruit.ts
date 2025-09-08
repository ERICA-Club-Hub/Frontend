import { apiRequest } from '@/api/apiRequest';
import { useQuery } from '@tanstack/react-query';

interface ApiClubRecruitResponse {
    due: string;
    target: string;
    notice: string;
    etc: string;
}

export const useClubRecruit = (clubId: string, isPreview: boolean) => {
    return useQuery({
        queryKey: ['clubDetailRecruitment', clubId, isPreview],
        queryFn: async (): Promise<ApiClubRecruitResponse> => {
            const requestUrl = isPreview
                ? `/api/clubs/club-admin/${clubId}/recruitment/draft`
                : `/api/clubs/${clubId}/recruitment`;

            const response = await apiRequest({
                url: requestUrl,
                requireToken: isPreview,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error('동아리 모집 상태 불러오기 실패');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!clubId && clubId.trim() !== '',
    });
};
