import { apiRequest } from '@/api/apiRequest';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useMutation } from '@tanstack/react-query';

export const useRecruitmentEmailMutation = (clubId: string | undefined) => {
    const { handleError } = useErrorHandler();

    return useMutation({
        mutationFn: async (data: { email: string }) => {
            return await apiRequest({
                url: `/api/clubs/${clubId}/recruitment-alerts`,
                method: 'POST',
                data,
            });
        },
        onError: (error) => {
            handleError(error);
        },
    });
};
