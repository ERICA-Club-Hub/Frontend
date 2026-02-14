import { apiRequest } from '@/api/apiRequest';
import { ClubRecruitmentRequest } from '@/api/data-contracts';
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

/**
 * 동아리 모집 안내 입력 및 수정
 */
export const useUpdateRecruitMutation = () => {
    return useMutation({
        mutationFn: async ({
            data,
            clubId,
        }: {
            data: ClubRecruitmentRequest;
            clubId: number;
        }) => {
            return await apiRequest({
                url: `/api/clubs/club-admin/${clubId}/recruitment`,
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
    });
};
