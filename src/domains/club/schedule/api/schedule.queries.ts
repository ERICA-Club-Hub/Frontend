import { ClubScheduleResponse } from '@/api/data-contracts';
import {
    ClubDetailQueryProps,
    useClubApi,
} from '@/domains/shared/api/club.queries';

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
