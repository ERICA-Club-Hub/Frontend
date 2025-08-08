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

interface ApiClubInfoResponse {
    leaderName: string;
    leaderEmail: string;
    leaderPhone: string;
    activities: string;
    membershipFee: string;
    snsUrl: string;
}

export const useClubIntro = () => {
    const nowUrl = location.pathname.split('/')[1];
    const { id } = useParams();
    const isPreview = nowUrl === 'club-detail-preview'; // TODO 추후에 외부에서 주입하는 방식으로 refactor

    const {
        data: clubIntroduction,
        isLoading: isIntroductionLoading,
        isError: isIntroductionError,
    } = useQuery({
        queryKey: ['clubIntroduction', id, isPreview],
        queryFn: async (): Promise<ApiClubIntroductionResponse> => {
            const requestUrl = isPreview
                ? `/api/clubs/club-admin/${id}/introduction/draft`
                : `/api/clubs/${id}/introduction`;

            const response = await apiRequest({
                url: requestUrl,
                requireToken: isPreview,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error('동아리 소개 조회 실패');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    const {
        data: clubSchedules,
        isLoading: isScheduleLoading,
        isError: isScheduleError,
    } = useQuery({
        queryKey: ['clubSchedules', id, isPreview],
        queryFn: async (): Promise<ApiClubScheduleResponse> => {
            const requestUrl = isPreview
                ? `/api/clubs/club-admin/${id}/schedules/draft`
                : `/api/clubs/${id}/schedules`;

            const response = await apiRequest({
                url: requestUrl,
                requireToken: isPreview,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error('동아리 월 별 일정 조회 실패');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    const {
        data: clubInfo,
        isLoading: isClubInfoLoading,
        isError: isClubInfoError,
    } = useQuery({
        queryKey: ['clubInfo', id, isPreview],
        queryFn: async (): Promise<ApiClubInfoResponse> => {
            const requestUrl = isPreview
                ? `/api/clubs/club-admin/${id}/info/draft` // TODO api 생기면 엔드포인트 변경
                : `/api/clubs/${id}/info`;

            const response = await apiRequest({
                url: requestUrl,
                requireToken: isPreview,
            });

            if (response.isSuccess) {
                return response.result;
            }
            throw new Error('동아리 월 별 일정 조회 실패');
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    return {
        clubInfo,
        clubIntroduction,
        clubSchedules,
        isClubInfoLoading,
        isClubInfoError,
        isIntroductionLoading,
        isIntroductionError,
        isScheduleError,
        isScheduleLoading,
    };
};
