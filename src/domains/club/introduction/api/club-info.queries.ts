import { apiRequest } from '@/api/apiRequest';
import {
    ClubDetailResponse,
    ClubRecruitmentResponse,
    ClubScheduleResponse,
} from '@/api/data-contracts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface UseClubApiOptions {
    clubId?: string;
    isPreview: boolean;
    endpoint?: string;
    errorMessage: string;
}

export const useClubApi = <T>({
    clubId,
    isPreview,
    endpoint,
    errorMessage,
}: UseClubApiOptions) => {
    return useQuery({
        queryKey: [endpoint, clubId, isPreview],
        queryFn: async (): Promise<T> => {
            const baseUrl = isPreview
                ? `/api/clubs/club-admin/${clubId}`
                : `/api/clubs/${clubId}`;
            const suffix = isPreview ? '/draft' : '';
            const requestUrl = endpoint
                ? `${baseUrl}/${endpoint}${suffix}`
                : `${baseUrl}${suffix}`;

            const response = await apiRequest({
                url: requestUrl,
                requireToken: isPreview,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error(errorMessage);
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!clubId && clubId.trim() !== '', // id === '' 일 때를 대비
    });
};

export const useIsPreview = () => {
    const nowUrl = location.pathname.split('/')[1];
    const { id } = useParams();
    const isPreview = nowUrl === 'club-detail-preview';
    return { nowUrl, id, isPreview };
};

interface ClubDetailHookProps {
    clubId?: string;
    isPreview: boolean;
}

export const useClubSchedules = ({ clubId, isPreview }: ClubDetailHookProps) =>
    useClubApi<ClubScheduleResponse>({
        clubId,
        isPreview,
        endpoint: 'schedules',
        errorMessage: '동아리 스케줄 조회 실패',
    });

export const useClubInfo = ({ clubId, isPreview }: ClubDetailHookProps) =>
    useClubApi<ClubDetailResponse>({
        clubId,
        isPreview,
        endpoint: 'info',
        errorMessage: '동아리 정보 조회 실패',
    });

export const useClubRecruitment = ({
    clubId,
    isPreview,
}: ClubDetailHookProps) =>
    useClubApi<ClubRecruitmentResponse>({
        clubId,
        isPreview,
        endpoint: 'recruitment',
        errorMessage: '동아리 모집 상태 불러오기 실패',
    });
