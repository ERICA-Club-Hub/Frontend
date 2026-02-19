import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/api/queryClient';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useMutation } from '@tanstack/react-query';

/**
 * 피드백 제출
 */
export const useFeedbackMutation = () => {
    const { handleError } = useErrorHandler();

    return useMutation({
        mutationFn: async (data: { content: string }) => {
            return await apiRequest({
                url: `/api/feedbacks`,
                method: 'POST',
                data,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
        },
        onError: (error) => {
            handleError(error);
        },
    });
};
