import { apiRequest } from '@/api/apiRequest';
import { ApiResponseGetOfficialAccounts } from '@/api/data-contracts';
import { useQuery } from '@tanstack/react-query';

export const useClubSNS = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['club', 'instagram', 'popular'],
        queryFn: async (): Promise<ApiResponseGetOfficialAccounts> => {
            const reponse = await apiRequest({
                url: '/api/clubs/instagram/popular',
            });
            return reponse;
        },
    });
    return { data, isError, isLoading };
};
