import { ClubRecruitmentResponse } from '@/api/data-contracts';
import {
    ClubDetailQueryProps,
    useClubApi,
} from '@/domains/shared/api/club.queries';

export const useClubRecruitmentQuery = ({
    clubId,
    isPreview,
}: ClubDetailQueryProps) =>
    useClubApi<ClubRecruitmentResponse>({
        clubId,
        isPreview,
        endpoint: 'recruitment',
        errorMessage: '동아리 모집 상태 불러오기 실패',
    });
