import { apiRequest } from '@/api/apiRequest';
import { ApiResponseGetInstagrams } from '@/api/data-contracts';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ClubType } from '../../../hooks/queries/useClubList';

export const useClubSNS = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['club', 'instagram', 'popular'],
        queryFn: async (): Promise<ApiResponseGetInstagrams> => {
            const response = await apiRequest({
                url: '/api/clubs/instagram/popular',
            });
            return response;
        },
    });
    return { data, isError, isLoading };
};

interface UseClubSNSByTypeProps {
    clubType: ClubType;
    category?: string;
    college?: string;
    department?: string;
    size?: number;
}

export const useClubSNSByType = ({
    clubType,
    category,
    college,
    department,
    size = 10,
}: UseClubSNSByTypeProps) => {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: [
            'club',
            'instagram',
            clubType,
            category,
            college,
            department,
        ],
        queryFn: async ({
            pageParam = 0,
        }): Promise<ApiResponseGetInstagrams> => {
            const params = new URLSearchParams({
                page: String(pageParam),
                size: String(size),
            });

            if (category) params.append('category', category);
            if (college) params.append('college', college);
            if (department) params.append('department', department);

            const response = await apiRequest({
                url: `/api/clubs/instagram/${clubType}?${params.toString()}`,
            });
            return response;
        },
        getNextPageParam: (lastPage) => {
            const result = lastPage.result;
            if (!result) return undefined;

            const currentPage = result.page ?? 0;
            const totalPage = result.totalPage ?? 0;

            return currentPage + 1 < totalPage ? currentPage + 1 : undefined;
        },
        initialPageParam: 0,
    });

    const accounts =
        data?.pages.flatMap((page) => page.result?.officialAccounts ?? []) ??
        [];

    return {
        accounts,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};
