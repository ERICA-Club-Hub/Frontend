import { apiRequest } from '@/api/apiRequest';
import { collage, department, unionType } from '@/types/club-search.types';
import { Category } from '@/utils/clubDetail/getCategoryEmoji';
import { RecruitmentStatus } from '@/utils/clubDetail/getRecruitmentStatus';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

interface BaseClubParams {
    keyword?: string;
    status?: RecruitmentStatus;
    page?: number;
    size?: number;
}

type SortBy = 'NAME_ASC' | 'CATEGORY_ASC' | 'RECRUITMENT_STATUS_ASC';

interface CentralClubParams extends BaseClubParams {
    category?: Category;
    sortBy?: SortBy;
}

interface UnionClubParams extends BaseClubParams {
    unionType?: unionType;
    sortBy?: SortBy;
}

interface CollegeClubParams extends BaseClubParams {
    college?: collage;
    sortBy?: SortBy;
}

interface DepartmentClubParams extends BaseClubParams {
    college?: collage;
    department?: department;
    sortBy?: SortBy;
}
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

interface ApiClubListResponse {
    content: Club[];
}

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

export const useClubSearchFromUrl = (keyword: string) => {
    const [searchParams] = useSearchParams();

    const params: ClubSearchParams = {
        type: (searchParams.get('type') as ClubType) || 'popular',
        keyword: keyword,
        status: searchParams.get('status') || undefined,
        sortBy: searchParams.get('sortBy') || undefined,
        page: Number(searchParams.get('page')) || 0,
        size: Number(searchParams.get('size')) || 10,
        category: searchParams.get('category') || undefined,
        unionType: searchParams.get('unionType') || undefined,
        college: searchParams.get('college') || undefined,
        department: searchParams.get('department') || undefined,
    };

    return useQuery({
        queryKey: ['clubs', params.type, params],
        queryFn: async (): Promise<ApiClubListResponse> => {
            const url = buildClubApiUrl(params);
            const response = await apiRequest({ url });
            return response.result;
        },
        enabled: !keyword,
    });
};

export const usePopularClubs = (
    params: Pick<BaseClubParams, 'page' | 'size'>, // page, size만 사용하기 위해서
) => {
    return useQuery({
        queryKey: ['clubs', 'popular', params.page, params.size],
        queryFn: async (): Promise<ApiClubListResponse> => {
            const searchParams = new URLSearchParams();
            if (params.page !== undefined)
                searchParams.set('page', params.page.toString());
            if (params.size !== undefined)
                searchParams.set('size', params.size.toString());

            const response = await apiRequest({
                url: `/api/clubs/popular?${searchParams.toString()}`,
            });
            return response.result;
        },
    });
};

export const useCentralClubs = (params: CentralClubParams) => {
    return useQuery({
        queryKey: [
            'clubs',
            'central',
            params.keyword,
            params.category,
            params.status,
            params.sortBy,
            params.page,
            params.size,
        ],
        queryFn: async (): Promise<ApiClubListResponse> => {
            const searchParams = new URLSearchParams();
            if (params.keyword) searchParams.set('keyword', params.keyword);
            if (params.category) searchParams.set('category', params.category);
            if (params.status) searchParams.set('status', params.status);
            if (params.sortBy) searchParams.set('sortBy', params.sortBy);
            if (params.page !== undefined)
                searchParams.set('page', params.page.toString());
            if (params.size !== undefined)
                searchParams.set('size', params.size.toString());

            const response = await apiRequest({
                url: `/api/clubs/central?${searchParams.toString()}`,
            });
            return response.result;
        },
    });
};

export const useUnionClubs = (params: UnionClubParams) => {
    return useQuery({
        queryKey: [
            'clubs',
            'union',
            params.keyword,
            params.unionType,
            params.status,
            params.sortBy,
            params.page,
            params.size,
        ],
        queryFn: async (): Promise<ApiClubListResponse> => {
            const searchParams = new URLSearchParams();
            if (params.keyword) searchParams.set('keyword', params.keyword);
            if (params.unionType)
                searchParams.set('category', params.unionType);
            if (params.status) searchParams.set('status', params.status);
            if (params.sortBy) searchParams.set('sortBy', params.sortBy);
            if (params.page !== undefined)
                searchParams.set('page', params.page.toString());
            if (params.size !== undefined)
                searchParams.set('size', params.size.toString());

            const response = await apiRequest({
                url: `/api/clubs/union?${searchParams.toString()}`,
            });
            return response.result;
        },
    });
};

export const useCollegeClubs = (params: CollegeClubParams) => {
    return useQuery({
        queryKey: [
            'clubs',
            'college',
            params.keyword,
            params.college,
            params.status,
            params.sortBy,
            params.page,
            params.size,
        ],
        queryFn: async (): Promise<ApiClubListResponse> => {
            const searchParams = new URLSearchParams();
            if (params.keyword) searchParams.set('keyword', params.keyword);
            if (params.college) searchParams.set('college', params.college);
            if (params.status) searchParams.set('status', params.status);
            if (params.sortBy) searchParams.set('sortBy', params.sortBy);
            if (params.page !== undefined)
                searchParams.set('page', params.page.toString());
            if (params.size !== undefined)
                searchParams.set('size', params.size.toString());

            const response = await apiRequest({
                url: `/api/clubs/college?${searchParams.toString()}`,
            });
            return response.result;
        },
    });
};

export const useDepartmentClubs = (params: DepartmentClubParams) => {
    return useQuery({
        queryKey: [
            'clubs',
            'department',
            params.keyword,
            params.college,
            params.department,
            params.status,
            params.sortBy,
            params.page,
            params.size,
        ],
        queryFn: async (): Promise<ApiClubListResponse> => {
            const searchParams = new URLSearchParams();
            if (params.keyword) searchParams.set('keyword', params.keyword);
            if (params.college) searchParams.set('college', params.college);
            if (params.department)
                searchParams.set('department', params.department);
            if (params.status) searchParams.set('status', params.status);
            if (params.sortBy) searchParams.set('sortBy', params.sortBy);
            if (params.page !== undefined)
                searchParams.set('page', params.page.toString());
            if (params.size !== undefined)
                searchParams.set('size', params.size.toString());

            const response = await apiRequest({
                url: `/api/clubs/department?${searchParams.toString()}`,
            });
            return response.result;
        },
    });
};
