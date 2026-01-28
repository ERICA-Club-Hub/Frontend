/* --- 신규 동아리 등록 대기 --- */

// 신규 동아리 등록 대기 카테고리
interface PendingRegistrationCategory {
    centralCategoryName: string | null;
    clubCategoryName: string;
    collegeName: string | null;
    departmentName: string | null;
    unionCategoryName: string | null;
}
// 신규 동아리 등록 대기 동아리 정보
interface ClubRegistrationDTOList {
    clubName: string;
    leaderEmail: string;
    briefIntroduction: string;
    category: PendingRegistrationCategory;
    clubRegistrationId: number;
    oneLiner: string;
}

// 신규 동아리 등록 대기 응답
interface PendingRegistrationResponse {
    clubRegistrationDTOList: ClubRegistrationDTOList[];
}

export type {
    PendingRegistrationCategory,
    ClubRegistrationDTOList,
    PendingRegistrationResponse,
};
