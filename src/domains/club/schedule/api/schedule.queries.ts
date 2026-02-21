import { apiRequest } from '@/api/apiRequest';
import { ClubScheduleResponse } from '@/api/data-contracts';
import {
    ClubDetailQueryProps,
    useClubApi,
} from '@/domains/shared/api/club.queries';
import { APIResponse } from '@/types/api.types';
import { useQuery } from '@tanstack/react-query';

/**
 * 동아리 월 별 일정 조회
 * @usage - 동아리 상세(미리보기) 페이지
 */
export const useClubScheduleQuery = ({
    clubId,
    isPreview,
}: ClubDetailQueryProps) =>
    useClubApi<ClubScheduleResponse>({
        clubId,
        isPreview,
        endpoint: 'schedules',
        errorMessage: '동아리 스케줄 조회 실패',
    });

/**
 * 동아리 월 별 일정 조회
 * @usage - 어드민 상세(연간 일정) 폼
 */
export const useSchedulesQuery = ({
    clubId,
}: {
    clubId: string | undefined;
}) => {
    return useQuery({
        queryKey: ['clubs', 'schedules', clubId],
        queryFn: async (): Promise<APIResponse<ClubScheduleResponse>> =>
            apiRequest({
                url: `/api/clubs/${clubId}/schedules`,
                method: 'GET',
            }),
        staleTime: 1000 * 60 * 5,
        select: (data) => data.result,
        enabled: !!clubId,
    });
};
