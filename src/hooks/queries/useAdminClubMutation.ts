import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { ClubIdType, IRecruitNoticeValue, ISummaryInfoValue } from '@/types';
import { useMutation } from '@tanstack/react-query';

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

export default function useAdminClubMutation() {
    return {
        useSaveSummaryInfoMutation,
        useSaveRecruitNoticeMutation,
    };
}
