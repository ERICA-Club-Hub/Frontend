import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/api/queryClient';
import { useMutation } from '@tanstack/react-query';

/**
 * 모집 상태 업데이트
 */
export const useUpdateRecruitStatusMutation = (clubId: number) => {
    return useMutation({
        mutationFn: async (option: number) => {
            return await apiRequest({
                url: `/api/clubs/${clubId}/recruitment-status`,
                method: 'POST',
                params: {
                    option,
                },
                requireToken: true,
            });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['clubs'],
            });
        },
    });
};
