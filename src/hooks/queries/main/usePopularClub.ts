import { apiRequest } from '@/api/apiRequest';
import { ApiResponseClubSearchResponse } from '@/api/data-contracts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const usePopularClub = () => {
    const [popularRequestSize, setPopularRequestSize] = useState<4 | 10>(4);

    const {
        data: popularResult,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [popularRequestSize, 'popular', 'club'],
        queryFn: async (): Promise<ApiResponseClubSearchResponse> => {
            const response = await apiRequest({
                url: `/api/clubs/popular?page=0&size=${popularRequestSize}`,
            });
            return response;
        },
    });

    return {
        popularRequestSize,
        setPopularRequestSize,
        popularResult,
        isError,
        isLoading,
    };
};
