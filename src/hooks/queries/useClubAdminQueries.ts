import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import {
    ClubIdType,
    IClubIntroValue,
    IEventScheduleValue,
    IRecruitNoticeValue,
    ISummaryInfoValue,
} from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// 동아리 요약 정보 불러오기
const useSummaryInfoQuery = ({
    clubId,
    setInputValue,
}: {
    clubId: number | null;
    setInputValue: React.Dispatch<React.SetStateAction<ISummaryInfoValue>>;
}) => {
    const { isPending, isSuccess, data, isError } = useQuery({
        queryKey: [clubId, 'summaryInfo'],
        queryFn: async () => {
            return await apiRequest({
                url: `/api/clubs/${clubId}`,
                method: 'GET',
            });
        },
        select: (data) => ({
            recruitmentStatus: data.result.recruitmentStatus,
            leaderName: data.result.leaderName || '',
            leaderPhone: data.result.leaderPhone || '',
            activities: data.result.activities || '',
            membershipFee: data.result.membershipFee || '',
            snsUrl: data.result.snsUrl || '',
            applicationUrl: data.result.applicationUrl || '',
        }),
        staleTime: 5 * 60 * 1000,
    });

    // 데이터 불러오기 성공 시, 요약정보 상태 업데이트
    useEffect(() => {
        if (isSuccess && data) {
            setInputValue(data);
        }

        if (isError) {
            console.error('동아리 요약 정보 불러오기 실패');
        }
    }, [isSuccess, data]);

    return {
        isPending,
    };
};

// 요약 정보 저장
const useSaveSummaryInfoMutation = ({
    clubId,
    inputValue,
}: {
    clubId: ClubIdType;
    inputValue: ISummaryInfoValue;
}) =>
    useMutation({
        mutationFn: async () => {
            return await apiRequest({
                url: `/api/clubs/club-admin/${clubId}`,
                method: 'POST',
                data: inputValue,
                requireToken: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [clubId, 'summaryInfo'],
            });
        },
        onError: (error) => {
            console.error('요약정보 저장 실패', error);
        },
    });

// 동아리 소개글 저장
const useSaveClubIntroMutation = ({
    clubId,
    inputValue,
    postSchedules,
}: {
    clubId: ClubIdType;
    postSchedules: IEventScheduleValue[];
    inputValue: IClubIntroValue;
}) =>
    useMutation({
        mutationFn: async () => {
            const [introResponse, scheduleResponse] = await Promise.all([
                apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/introduction`,
                    method: 'POST',
                    data: inputValue,
                    requireToken: true,
                }),
                apiRequest({
                    url: `/api/clubs/club-admin/${clubId}/schedules`,
                    method: 'POST',
                    data: {
                        schedules: postSchedules,
                    },
                    requireToken: true,
                }),
            ]);

            return { introResponse, scheduleResponse };
        },
        onSuccess: () => {
            // 해당 쿼리키를 stale 상태로 변경
            // -> 기존에 캐시된 데이터를 사용할 수 없도록 하여 이후 호출 시에 최신 데이터를 다시 가져오도록 트리거
            queryClient.invalidateQueries({
                queryKey: ['eventSchedules'],
            });
        },
        onError: (error) => {
            console.error('동아리 소개글 저장하기 실패', error);
        },
    });

// 월별 활동 일정 불러오기
const useEventSchedulesQuery = ({
    clubId,
    setSchedules,
}: {
    clubId: number | null;
    setSchedules: React.Dispatch<React.SetStateAction<IEventScheduleValue[]>>;
}) => {
    const { isSuccess, data, isError } = useQuery({
        queryKey: ['eventSchedules'],
        queryFn: async () => {
            return await apiRequest({
                url: `/api/clubs/${clubId}/schedules`,
                method: 'GET',
                requireToken: true,
            });
        },
        select: (data) => data.result.schedules,
        staleTime: 5 * 60 * 1000,
    });

    // 데이터 불러오기 성공 시, schedules 상태 업데이트
    useEffect(() => {
        if (isSuccess && data.length > 0) {
            setSchedules(data);
        }

        if (isError) {
            console.error('동아리 일정 불러오기 실패');
        }
    }, [isSuccess, data]);
};

// 동아리 소개글 정보 불러오기
const useClubDescriptionQuery = ({
    clubId,
    setInputValue,
}: {
    clubId: number | null;
    setInputValue: React.Dispatch<React.SetStateAction<IClubIntroValue>>;
}) => {
    const { isSuccess, data, isError } = useQuery({
        queryKey: [clubId, 'clubDescription'],
        queryFn: async () => {
            return await apiRequest({
                url: `/api/clubs/${clubId}/introduction`,
                method: 'GET',
                requireToken: true,
            });
        },
        // 데이터 구조 변경
        select: (data) => ({
            introduction: data.result.introduction || '',
            activity: data.result.activity || '',
            recruitment: data.result.recruitment || '',
        }),
        staleTime: 5 * 60 * 1000, // 5분
    });

    useEffect(() => {
        if (isSuccess && data) {
            setInputValue(data);
        }

        if (isError) {
            console.error('동아리 소개글 불러오기 실패');
        }
    }, [isSuccess, data]);
};

// 모집안내 정보 불러오기
const useRecruitNoticeQuery = ({
    clubId,
    setInputValue,
}: {
    clubId: number | null;
    setInputValue: React.Dispatch<React.SetStateAction<IRecruitNoticeValue>>;
}) => {
    const { isPending, isSuccess, data, isError } = useQuery({
        queryKey: [clubId, 'recruitNotice'],
        queryFn: async () => {
            return await apiRequest({
                url: `/api/clubs/${clubId}/recruitment`,
                method: 'GET',
            });
        },
        select: (data) => ({
            due: data.result.due,
            notice: data.result.notice,
            etc: data.result.etc,
        }),
        staleTime: 5 * 60 * 1000,
    });

    // 데이터 불러오기 성공 시, 모집안내 상태 업데이트
    useEffect(() => {
        if (isSuccess && data) {
            setInputValue(data);
        }

        if (isError) {
            console.error('동아리 모집안내 정보 불러오기 실패');
        }
    }, [isSuccess, data]);

    return {
        isPending,
    };
};

// 모집안내 저장
const useSaveRecruitNoticeMutation = ({
    clubId,
    inputValue,
}: {
    clubId: ClubIdType;
    inputValue: IRecruitNoticeValue;
}) =>
    useMutation({
        mutationFn: async () => {
            return await apiRequest({
                url: `/api/clubs/club-admin/${clubId}/recruitment`,
                method: 'POST',
                data: inputValue,
                requireToken: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [clubId, 'recruitNotice'],
            });
        },
        onError: (error) => {
            console.error('모집안내 저장 실패', error);
        },
    });

function useClubAdminQueries() {
    return {
        useSummaryInfoQuery,
        useSaveSummaryInfoMutation,
        useSaveClubIntroMutation,
        useEventSchedulesQuery,
        useClubDescriptionQuery,
        useRecruitNoticeQuery,
        useSaveRecruitNoticeMutation,
    };
}

export default useClubAdminQueries;
