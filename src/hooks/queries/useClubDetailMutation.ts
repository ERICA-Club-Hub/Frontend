import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { ClubIdType, ISummaryInfoValue } from '@/types';
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
        onSuccess: (data) => {
            console.log('요약정보 저장 성공', data);
            queryClient.invalidateQueries({
                queryKey: [clubId, 'summaryInfo'],
            });
        },
        onError: (error) => {
            console.error('요약정보 저장 실패', error);
        },
    });

export default function useClubDetailMutation() {
    return {
        useSaveSummaryInfoMutation,
    };
}
