import { useMutation } from '@tanstack/react-query';
import { IntroSchema } from '../model/introduction.schema';
import { queryClient } from '@/api/queryClient';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { apiRequest } from '@/api/apiRequest';

/**
 * 동아리 상세 정보 입력 및 수정
 */
export const useUpdateClubDetailMutation = () => {
    const { handleError } = useErrorHandler();

    return useMutation({
        mutationFn: async ({
            data,
            clubId,
        }: {
            data: IntroSchema;
            clubId: number;
        }) => {
            return await apiRequest({
                url: `/api/clubs/club-admin/${clubId}`,
                method: 'POST',
                data,
                requireToken: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['clubs'],
            });
        },
        onError: (error) => {
            handleError(error);
        },
    });
};
