import { ClubDetailResponse } from '@/api/data-contracts';
import {
    ClubDetailQueryProps,
    useClubApi,
} from '@/domains/shared/api/club.queries';

/**
 * 동아리 상세 정보 조회
 */
export const useClubIntroQuery = ({
    clubId,
    isPreview,
}: ClubDetailQueryProps) =>
    useClubApi<ClubDetailResponse>({
        clubId,
        isPreview,
        errorMessage: '동아리 정보 조회 실패',
    });
