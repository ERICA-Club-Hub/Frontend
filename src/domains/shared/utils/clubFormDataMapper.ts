import {
    ClubAdminDetailResponse,
    ClubOverviewResponse,
    GetRegistrationResponse,
} from '@/api/data-contracts';
import { ClubType } from '@/types/category.types';

export type ClubFormData =
    | ClubOverviewResponse
    | GetRegistrationResponse
    | ClubAdminDetailResponse;

/**
 * 동아리 등록/수정 폼에서 사용하는 형태로 변환하는 데이터 정규화 함수
 * @param data - 동아리 응답 데이터
 * @usage - ClubProfileForm에서 동아리 등록/수정 폼에 데이터를 전달 시 사용
 */
export const normalizeData = (data: ClubFormData) => {
    const isOverview = 'name' in data;
    // const isRegistration = 'clubRegistrationId' in data;

    return {
        clubName: isOverview
            ? data.name
            : (data as GetRegistrationResponse).clubName,
        leaderEmail: (data as GetRegistrationResponse).leaderEmail ?? undefined,
        category: {
            clubCategoryName: data.category?.clubCategoryName as ClubType,
            centralCategoryName: data.category?.centralCategoryName,
            unionCategoryName: data.category?.unionCategoryName,
            collegeName: data.category?.collegeName,
            departmentName: data.category?.departmentName,
        },
        oneLiner: data.oneLiner,
        briefIntroduction:
            ((data as GetRegistrationResponse).briefIntroduction ||
                (data as ClubAdminDetailResponse).description) ??
            undefined,
        profileImageUrl: data.profileImageUrl,
    };
};
