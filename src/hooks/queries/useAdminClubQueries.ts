import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { ClubIdType, IRecruitNoticeValue, ISummaryInfoValue } from '@/types';
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
            leaderName: data.result.leaderName,
            leaderPhone: data.result.leaderPhone,
            activities: data.result.activities,
            membershipFee: data.result.membershipFee,
            snsUrl: data.result.snsUrl,
            applicationUrl: data.result.applicationUrl,
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

function useAdminClubQueries() {
    return {
        useSummaryInfoQuery,
        useSaveSummaryInfoMutation,
        useRecruitNoticeQuery,
        useSaveRecruitNoticeMutation,
    };
}

export default useAdminClubQueries;
