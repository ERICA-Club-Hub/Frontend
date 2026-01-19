import { apiRequest } from '@/api/apiRequest';
import { ClubSearchResponse } from '@/api/data-contracts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export type ClubType =
    | 'central'
    | 'union'
    | 'college'
    | 'department'
    | 'popular';

interface ClubSearchParams {
    // 통합 인터페이스
    type: ClubType;
    keyword?: string;
    status?: string;
    sortBy?: string;
    page?: number;
    size?: number;
    category?: string; // central용
    unionType?: string; // union용
    college?: string; // college, department용
    department?: string; // department용
}

export type Club = {
    id: number;
    name: string;
    oneLiner: string;
    recruitmentStatus: string;
    profileImageUrl: string;
    categoryName: string;
};

const buildClubApiUrl = (params: ClubSearchParams): string => {
    const { type, ...searchParams } = params;

    const baseUrl = `/api/clubs/${type}`;

    const urlParams = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            urlParams.set(key, value.toString());
        }
    });

    return `${baseUrl}?${urlParams.toString()}`;
};

export const useClubSearchFromUrl = () => {
    const [searchParams] = useSearchParams();

    const params = {
        type: (searchParams.get('type') as ClubType) || 'central',
        keyword: searchParams.get('keyword') || undefined,
        status: searchParams.get('status') || undefined,
        sortBy: searchParams.get('sortBy') || undefined,
        size: Number(searchParams.get('size')) || 10,
        category: searchParams.get('category') || undefined,
        unionType: searchParams.get('unionType') || undefined,
        college: searchParams.get('college') || undefined,
        department: searchParams.get('department') || undefined,
    };

    return useInfiniteQuery({
        queryKey: [
            'clubs',
            params.type,
            params.keyword,
            params.status,
            params.sortBy,
            params.college,
            params.department,
            params.category,
            params.unionType,
        ],
        queryFn: async ({ pageParam }): Promise<ClubSearchResponse> => {
            const urlParams = { ...params, page: pageParam };
            const url = buildClubApiUrl(urlParams);
            const response = await apiRequest({ url });
            return response.result;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const currentPage = lastPage.page ?? 0;
            const totalPages = lastPage.totalPages ?? 0;

            if (currentPage + 1 >= totalPages) return undefined;
            return currentPage + 1;
        },
    });
};
