import { apiRequest } from '@/api/apiRequest';
import {
    ClubAdminDetailResponse,
    ClubOverviewResponse,
} from '@/api/data-contracts';
import { APIResponse } from '@/types/api.types';
import { useQuery } from '@tanstack/react-query';

/**
 * 동아리 프로필 정보 조회 e.g. 동아리 이름, 모집 상태, 한 줄 소개 등
 * @usage - 동아리 상세 페이지, [동아리 어드민] 대시보드 페이지, [동아리 어드민] 동아리 기본 정보 관리 페이지
 */
export const useClubOverviewQuery = ({
    clubId,
    isPreview = false,
}: {
    clubId?: string;
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

/**
 * 서비스 어드민 동아리 프로필 정보 조회
 * @usage - [서비스 어드민] 동아리 관리 상세 페이지
 */
export const useServiceAdminClubProfileQuery = ({
    clubId,
}: {
    clubId?: string;
}) => {
    return useQuery({
        queryKey: ['clubs', 'profile', clubId],
        queryFn: async (): Promise<APIResponse<ClubAdminDetailResponse>> =>
            apiRequest({
                url: `/api/clubs/service-admin/${clubId}`,
                requireToken: true,
            }),
        select: (data) => data.result,
        staleTime: 5 * 60 * 1000,
        enabled: !!clubId,
    });
};
