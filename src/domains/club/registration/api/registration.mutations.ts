import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/api/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useToast } from '@/components/Toast/useToast';
import { FormValues } from '../../profile/model/profile.schema';
import { createFormData } from '@/utils/createFormData';
import { validateFileSize } from '@/utils/fileValidator';
import { MAX_FILE_SIZE_ERROR_MESSAGE } from '@/constants/max-file-size.constant';

/**
 * 동아리 등록 요청
 */
export const useRegistrationMutation = () => {
    const navigate = useNavigate();
    const { handleError } = useErrorHandler();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: async ({
            data,
            postImg,
        }: {
            data: FormValues;
            postImg: File | File[] | null;
        }) => {
            const formData = createFormData(data, postImg);

            validateFileSize(formData);

            return await apiRequest({
                url: `/api/clubs/registrations`,
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                requireToken: true,
            });
        },
        onSuccess: () => {
            navigate(PATHS.CLUB_REGISTRATION_COMPLETED, {
                replace: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['registrations'],
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

// 동아리 등록 요청 수락
export const useApproveRegistrationMutation = () => {
    const { handleError } = useErrorHandler();

    return useMutation({
        mutationFn: async (clubRegistrationId?: string) => {
            return await apiRequest({
                url: `/api/clubs/service-admin/registrations/${clubRegistrationId}`,
                method: 'POST',
                requireToken: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['registrations'],
            });
        },
        onError: (error) => {
            handleError(error);
        },
    });
};

// 동아리 등록 요청 제거
export const useDeleteRegistrationMutation = () => {
    const { handleError } = useErrorHandler();

    return useMutation({
        mutationFn: async (clubRegistrationId?: string) => {
            return await apiRequest({
                url: `/api/clubs/service-admin/registrations/${clubRegistrationId}`,
                method: 'DELETE',
                requireToken: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['registrations'],
            });
            queryClient.invalidateQueries({
                queryKey: ['clubs'],
            });
        },
        onError: (error) => {
            handleError(error);
        },
    });
};
