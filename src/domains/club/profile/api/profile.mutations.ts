import { apiRequest } from '@/api/apiRequest';
import { useToast } from '@/components/Toast/useToast';
import { MAX_FILE_SIZE } from '@/constants/max-file-size.constant';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { calculateFormDataSize } from '@/utils/calculateFileSize';
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

            const totalSize = calculateFormDataSize(formData);
            if (totalSize > MAX_FILE_SIZE)
                throw new Error('FILE_SIZE_EXCEEDED');

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
            if (error.message === 'FILE_SIZE_EXCEEDED') {
                showToast(`용량을 초과하는 사진이에요.`);
            } else {
                handleError(error);
            }
        },
    });
};
