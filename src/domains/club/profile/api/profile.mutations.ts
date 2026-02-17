import { apiRequest } from '@/api/apiRequest';
import { useToast } from '@/components/Toast/useToast';
import { MAX_FILE_SIZE_ERROR_MESSAGE } from '@/constants/max-file-size.constant';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { validateFileSize } from '@/utils/fileValidator';
import { useMutation } from '@tanstack/react-query';
import { FormValues } from '../model/profile.schema';
import { queryClient } from '@/api/queryClient';
import { createFormData } from '@/utils/createFormData';

/**
 * 동아리 기본 정보 수정 요청
 */
export const useUpdateProfileMutation = () => {
    const { handleError } = useErrorHandler();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: async ({
            data,
            postImg,
            clubId,
        }: {
            data: FormValues;
            postImg: File | File[] | null;
            clubId: number;
        }) => {
            const formData = createFormData(data, postImg);

            validateFileSize(formData);

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
                queryKey: ['clubs'],
            });
        },
        onError: (error) => {
            if (
                error instanceof Error &&
                error.message === MAX_FILE_SIZE_ERROR_MESSAGE
            ) {
                showToast(error.message);
            } else {
                handleError(error);
            }
        },
    });
};
