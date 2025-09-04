import { apiRequest } from '@/api/apiRequest';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface PopularClubsResponse {
    id: number;
    name: string;
    oneLiner: string;
    profileImageUrl: string;
    categoryName: string;
    recruitmentStatus: string;
}

export const usePopularClub = () => {
    const [popularRequestSize, setPopularRequestSize] = useState<4 | 10>(4);

    const {
        data: popularResult,
        isLoading,
        isError,
    } = useQuery({
        queryKey: [popularRequestSize, 'popular', 'club'],
        queryFn: async (): Promise<PopularClubsResponse[]> => {
            const response = await apiRequest({
                url: `/api/clubs/popular?page=0&size=${popularRequestSize}`,
            });
            return response.result.content;
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
