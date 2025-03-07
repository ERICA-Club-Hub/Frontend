import { apiRequest } from '@/api/apiRequest';
import { queryClient } from '@/config/queryClient';
import { ClubIdType } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// 등록 요청 동아리 조회
const useClubRegistrationRequestQuery = () => {
    const { isSuccess, data, isError } = useQuery({
        queryKey: ['clubRegisterRequest'],
        queryFn: async () => {
            return await apiRequest({
                url: `/api/clubs/service-admin/registrations`,
                method: 'GET',
                requireToken: true,
            });
        },
        select: (data) => data.result.clubRegistrationDTOList,
        staleTime: 5 * 60 * 1000,
    });

    // 데이터 불러오기 성공 시, 모집안내 상태 업데이트
    useEffect(() => {
        if (isError) {
            console.error('등록 요청 동아리 조회 실패');
        }
    }, [isSuccess, data]);

    return { data };
};

// 동아리 등록 요청 수락
const useClubRegistrationRequestMutation = () =>
    useMutation({
        mutationFn: async (clubRegistrationId: ClubIdType) => {
            return await apiRequest({
                url: `/api/clubs/service-admin/regisstrations/${clubRegistrationId}`,
                method: 'POST',
                requireToken: true,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['clubRegisterRequest'],
            });
        },
        onError: (error) => {
            console.error('동아리 등록 요청 수락 실패', error);
        },
    });

function useAdminClubQueries() {
    return {
        useClubRegistrationRequestQuery,
        useClubRegistrationRequestMutation,
    };
}

export default useAdminClubQueries;
