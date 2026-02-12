import { apiRequest } from '@/api/apiRequest';
import { useToast } from '@/components/Toast/useToast';
import { MAX_FILE_SIZE_ERROR_MESSAGE } from '@/constants/max-file-size.constant';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { validateFileSize } from '@/utils/fileValidator';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FormValues } from '../model/profile.schema';
import { createFormData } from './createFormData';
import { PATHS } from '@/routes/paths';

/**
 * 동아리 등록 요청
 */
export const useClubRegisterMutation = () => {
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
