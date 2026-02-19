import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { APIResponse } from '@/types/api.types';
import {
    GetRegistrationResponse,
    GetRegistrationsResponse,
} from '@/api/data-contracts';

// 등록 요청 동아리 조회
export const useRegistrationQuery = () => {
    return useQuery({
        queryKey: ['registrations'],
        queryFn: async (): Promise<APIResponse<GetRegistrationsResponse>> => {
            return await apiRequest({
                url: `/api/clubs/service-admin/registrations`,
                method: 'GET',
                requireToken: true,
            });
        },
        select: (data) => data.result.clubRegistrationResponseDTOList ?? [],
        staleTime: 5 * 60 * 1000,
    });
};

// 등록 요청 동아리 상세 조회
export const useRegistrationDetailQuery = (clubRegistrationId?: string) => {
    return useQuery({
        queryKey: ['registrations', clubRegistrationId],
        queryFn: async (): Promise<APIResponse<GetRegistrationResponse>> => {
            return await apiRequest({
                url: `/api/clubs/service-admin/registrations/${clubRegistrationId}`,
                method: 'GET',
                requireToken: true,
            });
        },
        select: (data) => data.result,
        staleTime: 5 * 60 * 1000,
        enabled: !!clubRegistrationId,
    });
};
