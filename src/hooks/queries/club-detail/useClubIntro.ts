import { apiRequest } from '@/api/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface ApiClubIntroductionResponse {
    introduction: string;
    activity: string;
}

type Schedule = {
    month: string;
    content: string;
};

interface ApiClubScheduleResponse {
    schedules: Schedule[];
}

export interface ApiClubInfoResponse {
    leaderName: string;
    leaderEmail: string;
    leaderPhone: string;
    activities: string;
    membershipFee: string;
    snsUrl: string;
}

interface UseClubApiOptions {
    clubId: string;
    isPreview: boolean;
    endpoint: string;
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
            const requestUrl = `${baseUrl}/${endpoint}${suffix}`;

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

export const useClubIntroduction = (clubId: string, isPreview: boolean) =>
    useClubApi<ApiClubIntroductionResponse>({
        clubId,
        isPreview,
        endpoint: 'introduction',
        errorMessage: '동아리 소개 조회 실패',
    });

export const useClubSchedules = (clubId: string, isPreview: boolean) =>
    useClubApi<ApiClubScheduleResponse>({
        clubId,
        isPreview,
        endpoint: 'schedules',
        errorMessage: '동아리 스케줄 조회 실패',
    });

export const useClubInfo = (clubId: string, isPreview: boolean) =>
    useClubApi<ApiClubInfoResponse>({
        clubId,
        isPreview,
        endpoint: 'info',
        errorMessage: '동아리 정보 조회 실패',
    });
