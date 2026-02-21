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

const isGetRegistrationResponse = (
    data: ClubFormData,
): data is GetRegistrationResponse => {
    return 'clubRegistrationId' in data || 'clubName' in data;
};

const isClubAdminDetailResponse = (
    data: ClubFormData,
): data is ClubAdminDetailResponse => {
    return 'description' in data;
};

/**
 * 동아리 등록/수정 폼에서 사용하는 형태로 변환하는 데이터 정규화 함수
 * @param data - 동아리 응답 데이터
 * @usage - ClubProfileForm에서 동아리 등록/수정 폼에 데이터를 전달 시 사용
 */
export const normalizeData = (data: ClubFormData) => {
    let clubName = '';
    let leaderEmail: string | undefined = undefined;
    let briefIntroduction: string | undefined = undefined;

    if (isGetRegistrationResponse(data)) {
        clubName = data.clubName ?? '';
        leaderEmail = data.leaderEmail;
        briefIntroduction = data.briefIntroduction;
    } else if (isClubAdminDetailResponse(data)) {
        clubName = data.name ?? '';
        leaderEmail = data.leaderEmail;
        briefIntroduction = data.description;
    } else {
        // ClubOverviewResponse
        clubName = data.name ?? '';
    }

    return {
        clubName,
        leaderEmail,
        category: {
            clubCategoryName: data.category?.clubCategoryName as ClubType,
            centralCategoryName: data.category?.centralCategoryName,
            unionCategoryName: data.category?.unionCategoryName,
            collegeName: data.category?.collegeName,
            departmentName: data.category?.departmentName,
        },
        oneLiner: data.oneLiner,
        briefIntroduction,
        profileImageUrl: data.profileImageUrl,
    };
};
