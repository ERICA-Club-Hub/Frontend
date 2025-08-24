import { apiRequest } from '@/api/apiRequest';
import { collage, department, unionType } from '@/types/club-search.types';
import { Category } from '@/utils/clubDetail/getCategoryEmoji';
import { RecruitmentStatus } from '@/utils/clubDetail/getRecruitmentStatus';
import { useQuery } from '@tanstack/react-query';

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

export type Club = {
    id: number;
    name: string;
    description: string;
    recruitmentStatus: RecruitmentStatus;
    profileImageUrl: string;
    activities: string;
    leaderName: string;
    leaderEmail: string;
    leaderPhone: string;
    membershipFee: number;
    snsUrl: string;
    applicationUrl: string;
    category: {
        clubCategoryName: Category;
        centralCategoryName: string;
        unionCategoryName: string;
        collegeName: string;
        departmentName: string;
    };
};

interface ApiClubListResponse {
    club: Club[];
}

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
