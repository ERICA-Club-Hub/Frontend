import { apiRequest } from '@/api/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { RecruitmentStatus } from '@/utils/clubDetail/getRecruitmentStatus';

interface Category {
    clubCategoryName: string | null;
    centralCategoryName: string | null;
    unionCategoryName: string | null;
    collegeName: string | null;
    departmentName: string | null;
}

interface ApiClubDetailHeaderResponse {
    profileImageUrl?: string;
    description: string;
    name: string;
    category: Category;
    recruitmentStatus: RecruitmentStatus;
    applicationUrl: string;
}

export const useClubDetailHeader = (clubId: string, isPreview: boolean) => {
    return useQuery({
        queryKey: ['clubDetailHeader', clubId, isPreview],
        queryFn: async (): Promise<ApiClubDetailHeaderResponse> => {
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
