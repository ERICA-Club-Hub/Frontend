import { apiRequest } from '@/api/apiRequest';
import { ApiResponseClubSearchResponse } from '@/api/data-contracts';
import { useQuery } from '@tanstack/react-query';

export const useRecentlyUpdatedClubs = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['clubs', 'recently'],
        queryFn: async (): Promise<ApiResponseClubSearchResponse> => {
            const response = await apiRequest({ url: '/api/clubs/recent' });
            return response;
        },
    });
    return { data, isLoading, isError };
};
