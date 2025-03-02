import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { ClubIdType, IRecruitNoticeValue, ISummaryInfoValue } from '@/types';
import { useMutation } from '@tanstack/react-query';

// 동아리 등록 정보 수정
const useEditClubRegisterMutation = ({
    clubId,
    formData,
}: {
    clubId: ClubIdType;
    formData: FormData;
}) =>
    useMutation({
        mutationFn: async () => {
            return await apiRequest({
                url: `/api/clubs/${clubId}/update`,
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                requireToken: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [clubId, 'registerInfo'],
            });
        },
        onError: (error) => {
            console.error('동아리 등록정보 저장 실패', error);
        },
    });

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

export default function useAdminClubMutation() {
    return {
        useEditClubRegisterMutation,
        useSaveSummaryInfoMutation,
        useSaveRecruitNoticeMutation,
    };
}
