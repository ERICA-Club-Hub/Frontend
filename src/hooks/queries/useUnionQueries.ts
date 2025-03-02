import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { useMutation } from '@tanstack/react-query';

// 총동연 공지사항 생성
const useCreateUnionNoticeMutation = ({ formData }: { formData: FormData }) =>
    useMutation({
        mutationFn: async () => {
            return await apiRequest({
                url: `/api/announcements/union-admin`,
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
                queryKey: ['union', 'notice'],
            });
        },
        onError: (error) => {
            console.error('총동연 공지사항 생성 실패', error);
        },
    });

function useUnionQueries() {
    return {
        useCreateUnionNoticeMutation,
    };
}

export default useUnionQueries;
