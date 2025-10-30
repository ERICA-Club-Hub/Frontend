/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateServiceAnnouncementRequestDTO {
    title?: string;
    content?: string;
}

export interface ApiResponseObject {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: object;
}

export interface FeedbackDTO {
    content?: string;
}

export interface ApiResponseVoid {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: object;
}

export interface CreateDocumentRequest {
    title?: string;
}

export interface ApiResponseLong {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** @format int64 */
    result?: number;
}

export interface Category {
    central?: 'VOLUNTEER' | 'ART' | 'SPORTS' | 'RELIGION' | 'ACADEMIC';
    union?:
        | 'IT'
        | 'MARKETING_AD'
        | 'ECONOMY_MANAGEMENT'
        | 'VOLUNTEER'
        | 'SPORTS'
        | 'LANGUAGE'
        | 'PRESENTATION'
        | 'BOOK'
        | 'ETC';
    college?:
        | 'GLOBAL_LAW_COMMUNICATION'
        | 'KYUNG_SANG'
        | 'COMMUNICATION_CULTURE'
        | 'ENGINEERING'
        | 'CONVERGENCE'
        | 'SOFTWARE'
        | 'DESIGN'
        | 'PHARMACY'
        | 'SPORT_ARTS'
        | 'LIONS_COLLEGE';
    department?:
        | 'ARCHITECTURE'
        | 'CONSTRUCTION_ENVIRONMENT'
        | 'TRANSPORT_LOGISTICS'
        | 'ELECTRICAL_ENGINEERING'
        | 'BATTERY_MATERIAL_CHEMICAL'
        | 'MATERIAL_CHEMICAL'
        | 'MECHANICAL'
        | 'INDUSTRIAL_MANAGEMENT'
        | 'ROBOT'
        | 'FUSION_SYSTEM'
        | 'SMART_FUSION'
        | 'INTELLIGENT_ROBOT'
        | 'ENERGY_BIO'
        | 'MARINE_FUSION'
        | 'COMPUTER'
        | 'ICT'
        | 'AI'
        | 'DATA'
        | 'PHARMACY'
        | 'SEMICONDUCTOR'
        | 'BIO'
        | 'DEFENSE_INTELLIGENCE'
        | 'KOREAN_STUDIES'
        | 'CHINA_STUDIES'
        | 'JAPAN_STUDIES'
        | 'ENGLISH_STUDIES'
        | 'FRENCH_STUDIES'
        | 'ADVERTISING'
        | 'MEDIA'
        | 'CULTURE'
        | 'ANTHROPOLOGY'
        | 'BUSINESS_ADMINISTRATION'
        | 'ECONOMICS'
        | 'ACTUARIAL_SCIENCE'
        | 'ACCOUNTING'
        | 'INTEGRATED_DESIGN'
        | 'JEWELRY'
        | 'INDUSTRIAL_DESIGN'
        | 'COMMUNICATION_DESIGN'
        | 'MEDIA_DESIGN'
        | 'SPORTS_SCIENCE'
        | 'DANCE'
        | 'MUSIC';
}

export interface ClubBasicInformationRequest {
    clubName?: string;
    leaderEmail?: string;
    clubType?: 'CENTRAL' | 'UNION' | 'COLLEGE' | 'DEPARTMENT';
    category?: Category;
    oneLiner?: string;
    briefIntroduction?: string;
}

export interface ApiResponseClubCommandResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubCommandResponse;
}

export interface ClubCommandResponse {
    /** @format int64 */
    clubId?: number;
}

export interface ApiResponseClubCodeResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubCodeResponse;
}

export interface ClubCodeResponse {
    code?: string;
}

export interface ClubDetailRequest {
    recruitmentStatus?: 'UPCOMING' | 'OPEN' | 'CLOSED';
    leaderName?: string;
    leaderPhone?: string;
    activities?: string;
    /** @format int32 */
    membershipFee?: number;
    snsUrl?: string;
    applicationUrl?: string;
}

export interface ClubScheduleListRequest {
    schedules?: ClubScheduleRequest[];
}

export interface ClubScheduleRequest {
    /** @format int32 */
    month?: number;
    content?: string;
    /** @format int64 */
    scheduleId?: number;
}

export interface ApiResponseScheduleListResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ScheduleListResponse;
}

export interface ScheduleListResponse {
    schedules?: ScheduleResponse[];
}

export interface ScheduleResponse {
    /** @format int64 */
    id?: number;
    /** @format int32 */
    month?: number;
    content?: string;
}

export interface ApiResponseClubScheduleDraftResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubScheduleDraftResponse;
}

export interface ClubScheduleDraftResponse {
    schedules?: ScheduleDraftResponse[];
    /** @format int32 */
    totalElements?: number;
}

export interface ScheduleDraftResponse {
    /** @format int64 */
    id?: number;
    /** @format int32 */
    month?: number;
    content?: string;
}

export interface ClubRecruitmentRequest {
    due?: string;
    notice?: string;
    etc?: string;
}

export interface ClubIntroductionRequest {
    introduction?: string;
    activity?: string;
    recruitment?: string;
}

export interface LoginRequestDTO {
    code?: string;
}

export interface ApiResponseLoginResponseDTO {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: LoginResponseDTO;
}

export interface LoginResponseDTO {
    /** @format int64 */
    clubId?: number;
    clubName?: string;
}

export interface CommonAnnouncementRequest {
    title?: string;
    url?: string;
}

export interface CreateActivityRequest {
    content?: string;
    /** @format date */
    date?: string;
}

export interface UpdateDocumentRequest {
    title?: string;
    removedFileIdList?: number[];
}

export interface UpdateActivityRequest {
    content?: string;
    /** @format date */
    date?: string;
}

export interface ApiResponseString {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: string;
}

export interface ApiResponseServiceAnnouncementSearchDTO {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ServiceAnnouncementSearchDTO;
}

export interface ServiceAnnouncementDetailDTO {
    /** @format int64 */
    id?: number;
    title?: string;
    content?: string;
    /** @format date-time */
    createdAt?: string;
}

export interface ServiceAnnouncementSearchDTO {
    serviceAnnouncements?: ServiceAnnouncementDetailDTO[];
    /** @format int32 */
    totalElements?: number;
}

export interface ApiResponseServiceAnnouncementDetailDTO {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ServiceAnnouncementDetailDTO;
}

export interface ApiResponseGetAllDocumentsResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: GetAllDocumentsResponse;
}

export interface DocumentDTO {
    /** @format int64 */
    id?: number;
    title?: string;
    /** @format date */
    date?: string;
}

export interface GetAllDocumentsResponse {
    documentDTOList?: DocumentDTO[];
}

export interface ApiResponseGetDocumentFilesResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: GetDocumentFilesResponse;
}

export interface FileDTO {
    fileName?: string;
    downloadUrl?: string;
}

export interface GetDocumentFilesResponse {
    fileDTOList?: FileDTO[];
}

export interface ApiResponseClubDetailListResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubDetailListResponse;
}

export interface ClubDetailListResponse {
    clubs?: ClubResponse[];
    /** @format int32 */
    totalElements?: number;
}

export interface ClubResponse {
    /** @format int64 */
    id?: number;
    name?: string;
    description?: string;
    recruitmentStatus?: 'UPCOMING' | 'OPEN' | 'CLOSED';
    profileImageUrl?: string;
    activities?: string;
    leaderName?: string;
    leaderEmail?: string;
    leaderPhone?: string;
    /** @format int32 */
    membershipFee?: number;
    snsUrl?: string;
    applicationUrl?: string;
    clubType?: 'CENTRAL' | 'UNION' | 'COLLEGE' | 'DEPARTMENT';
}

export interface ApiResponseClubResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubResponse;
}

export interface ApiResponseClubScheduleResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubScheduleResponse;
}

export interface ClubScheduleResponse {
    schedules?: ScheduleResponse[];
    /** @format int32 */
    totalElements?: number;
}

export interface ApiResponseClubRecruitmentResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubRecruitmentResponse;
}

export interface ClubRecruitmentResponse {
    due?: string;
    target?: string;
    notice?: string;
    etc?: string;
}

export interface ApiResponseClubOverviewResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubOverviewResponse;
}

export interface CategoryResponse {
    clubCategoryName?: string;
    centralCategoryName?: string;
    unionCategoryName?: string;
    collegeName?: string;
    departmentName?: string;
}

export interface ClubOverviewResponse {
    /** @format int64 */
    id?: number;
    name?: string;
    description?: string;
    recruitmentStatus?: 'UPCOMING' | 'OPEN' | 'CLOSED';
    profileImageUrl?: string;
    applicationUrl?: string;
    category?: CategoryResponse;
}

export interface ApiResponseClubIntroductionResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubIntroductionResponse;
}

export interface ClubIntroductionResponse {
    introduction?: string;
    activity?: string;
}

export interface ApiResponseClubBasicInfoResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubBasicInfoResponse;
}

export interface ClubBasicInfoResponse {
    leaderName?: string;
    leaderEmail?: string;
    leaderPhone?: string;
    activities?: string;
    /** @format int32 */
    membershipFee?: number;
    snsUrl?: string;
}

export interface ApiResponseClubDetailDraftResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubDetailDraftResponse;
}

export interface ClubDetailDraftResponse {
    name?: string;
    description?: string;
    recruitmentStatus?: 'UPCOMING' | 'OPEN' | 'CLOSED';
    leaderName?: string;
    leaderPhone?: string;
    activities?: string;
    /** @format int32 */
    membershipFee?: number;
    snsUrl?: string;
    applicationUrl?: string;
    profileImageUrl?: string;
    category?: CategoryResponse;
}

export interface ApiResponseClubSearchResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubSearchResponse;
}

export interface ClubSearchResponse {
    content?: ClubSearchResult[];
    /** @format int64 */
    totalElements?: number;
    /** @format int32 */
    page?: number;
    /** @format int32 */
    size?: number;
    /** @format int32 */
    totalPages?: number;
}

export interface ClubSearchResult {
    /** @format int64 */
    id?: number;
    name?: string;
    oneLiner?: string;
    profileImageUrl?: string;
    categoryName?: string;
    recruitmentStatus?: 'UPCOMING' | 'OPEN' | 'CLOSED';
}

export interface ApiResponseGetRegistrationsResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: GetRegistrationsResponse;
}

export interface ClubRegistrationResponse {
    /** @format int64 */
    clubRegistrationId?: number;
    clubName?: string;
    leaderEmail?: string;
    oneLiner?: string;
    briefIntroduction?: string;
    category?: CategoryResponse;
}

export interface GetRegistrationsResponse {
    clubRegistrationResponseDTOList?: ClubRegistrationResponse[];
}

export interface ApiResponseClubRecruitmentDraftResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubRecruitmentDraftResponse;
}

export interface ClubRecruitmentDraftResponse {
    club?: ClubResponse;
    due?: string;
    notice?: string;
    etc?: string;
}

export interface ApiResponseClubIntroductionDraftResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubIntroductionDraftResponse;
}

export interface ClubIntroductionDraftResponse {
    club?: ClubResponse;
    introduction?: string;
    activity?: string;
    recruitment?: string;
}

export interface AnnouncementDTO {
    /** @format int64 */
    announcementId?: number;
    title?: string;
    /** @format date */
    date?: string;
    url?: string;
    thumbnailUrl?: string;
}

export interface ApiResponseGetAllAnnouncementResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: GetAllAnnouncementResponse;
}

export interface GetAllAnnouncementResponse {
    announcementDTOList?: AnnouncementDTO[];
}

export interface ActivityImageDTO {
    /** @format int32 */
    orderIndex?: number;
    imageUrl?: string;
}

export interface ApiResponseGetSpecificActivityResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: GetSpecificActivityResponse;
}

export interface GetSpecificActivityResponse {
    clubName?: string;
    clubImageUrl?: string;
    content?: string;
    /** @format date */
    date?: string;
    activityImageDTOList?: ActivityImageDTO[];
}

export interface ActivityThumbnailDTO {
    /** @format int64 */
    activityId?: number;
    thumbnailUrl?: string;
}

export interface ApiResponseGetAllActivityResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: GetAllActivityResponse;
}

export interface GetAllActivityResponse {
    activityThumbnailDTOList?: ActivityThumbnailDTO[];
}

export interface ApiResponseRecentActivityLogResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: RecentActivityLogResponse;
}

export interface RecentActivityLog {
    imageUrl?: string;
    /** @format int64 */
    clubId?: number;
    clubName?: string;
    clubProfileImageUrl?: string;
}

export interface RecentActivityLogResponse {
    activityLogs?: RecentActivityLog[];
}

export interface UpdateClubInfoParams {
    /** @format int64 */
    clubId: number;
}

export interface ReissueClubCodeParams {
    /** @format int64 */
    clubId: number;
}

export interface AcceptClubRegistrationParams {
    /** @format int64 */
    clubRegistrationId: number;
}

export interface DeleteClubRegistrationParams {
    /** @format int64 */
    clubRegistrationId: number;
}

export interface PostSpecificClubParams {
    /** @format int64 */
    clubId: number;
}

export interface PostClubSchedulesParams {
    /** @format int64 */
    clubId: number;
}

export interface GetClubSchedulesDraftParams {
    /** @format int64 */
    clubId: number;
}

export interface PostClubSchedulesDraftParams {
    /** @format int64 */
    clubId: number;
}

export interface PostClubRecruitmentParams {
    /** @format int64 */
    clubId: number;
}

export interface GetClubRecruitmentDraftParams {
    /** @format int64 */
    clubId: number;
}

export interface PostClubRecruitmentDraftParams {
    /** @format int64 */
    clubId: number;
}

export interface PostClubIntroductionParams {
    /** @format int64 */
    clubId: number;
}

export interface GetClubIntroductionDraftParams {
    /** @format int64 */
    clubId: number;
}

export interface PostClubIntroductionDraftParams {
    /** @format int64 */
    clubId: number;
}

export interface PostSpecificClubDraftParams {
    /** @format int64 */
    clubId: number;
}

export interface PostNewActivityParams {
    /** @format int64 */
    clubId: number;
}

export interface DeleteServiceAnnouncementParams {
    /** @format int64 */
    id: number;
}

export interface UpdateServiceAnnouncementParams {
    /** @format int64 */
    id: number;
}

export interface GetDocumentFilesParams {
    /** @format int64 */
    documentId: number;
}

export interface DeleteDocumentParams {
    /** @format int64 */
    documentId: number;
}

export interface UpdateDocumentParams {
    /** @format int64 */
    documentId: number;
}

export interface DeleteAnnouncementParams {
    /** @format int64 */
    announcementId: number;
}

export interface UpdateAnnouncementParams {
    /** @format int64 */
    announcementId: number;
}

export interface DeleteActivityParams {
    /** @format int64 */
    activityId: number;
}

export interface UpdateActivityParams {
    /** @format int64 */
    activityId: number;
}

export interface GetAllServiceAnnouncementsParams {
    /** @format int32 */
    page?: number;
    /** @format int32 */
    size?: number;
}

export interface GetServiceAnnouncementParams {
    /** @format int64 */
    id: number;
}

export interface GetClubsByConditionParams {
    keyword?: string;
    category?: 'VOLUNTEER' | 'ART' | 'SPORTS' | 'RELIGION' | 'ACADEMIC';
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED';
    sortBy?: 'NAME_ASC' | 'CATEGORY_ASC' | 'RECRUITMENT_STATUS_ASC';
    /**
     * @format int32
     * @default 0
     */
    page?: number;
    /**
     * @format int32
     * @default 10
     */
    size?: number;
}

export interface GetSpecificClubParams {
    /** @format int64 */
    clubId: number;
}

export interface GetClubSchedulesParams {
    /** @format int64 */
    clubId: number;
}

export interface GetClubRecruitmentParams {
    /** @format int64 */
    clubId: number;
}

export interface GetSpecificClubOverviewParams {
    /** @format int64 */
    clubId: number;
}

export interface GetClubIntroductionParams {
    /** @format int64 */
    clubId: number;
}

export interface GetSpecificClubBasicInfoParams {
    /** @format int64 */
    clubId: number;
}

export interface GetSpecificClubDraftParams {
    /** @format int64 */
    clubId: number;
}

export interface GetUnionClubsByConditionParams {
    keyword?: string;
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED';
    sortBy?: 'NAME_ASC' | 'CATEGORY_ASC' | 'RECRUITMENT_STATUS_ASC';
    category?:
        | 'IT'
        | 'MARKETING_AD'
        | 'ECONOMY_MANAGEMENT'
        | 'VOLUNTEER'
        | 'SPORTS'
        | 'LANGUAGE'
        | 'PRESENTATION'
        | 'BOOK'
        | 'ETC';
    /**
     * @format int32
     * @default 0
     */
    page?: number;
    /**
     * @format int32
     * @default 10
     */
    size?: number;
}

export interface GetPopularClubsParams {
    /**
     * @format int32
     * @default 0
     */
    page?: number;
    /**
     * @format int32
     * @default 10
     */
    size?: number;
}

export interface GetCentralClubsByConditionParams {
    keyword?: string;
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED';
    sortBy?: 'NAME_ASC' | 'CATEGORY_ASC' | 'RECRUITMENT_STATUS_ASC';
    college?:
        | 'GLOBAL_LAW_COMMUNICATION'
        | 'KYUNG_SANG'
        | 'COMMUNICATION_CULTURE'
        | 'ENGINEERING'
        | 'CONVERGENCE'
        | 'SOFTWARE'
        | 'DESIGN'
        | 'PHARMACY'
        | 'SPORT_ARTS'
        | 'LIONS_COLLEGE';
    department?:
        | 'ARCHITECTURE'
        | 'CONSTRUCTION_ENVIRONMENT'
        | 'TRANSPORT_LOGISTICS'
        | 'ELECTRICAL_ENGINEERING'
        | 'BATTERY_MATERIAL_CHEMICAL'
        | 'MATERIAL_CHEMICAL'
        | 'MECHANICAL'
        | 'INDUSTRIAL_MANAGEMENT'
        | 'ROBOT'
        | 'FUSION_SYSTEM'
        | 'SMART_FUSION'
        | 'INTELLIGENT_ROBOT'
        | 'ENERGY_BIO'
        | 'MARINE_FUSION'
        | 'COMPUTER'
        | 'ICT'
        | 'AI'
        | 'DATA'
        | 'PHARMACY'
        | 'SEMICONDUCTOR'
        | 'BIO'
        | 'DEFENSE_INTELLIGENCE'
        | 'KOREAN_STUDIES'
        | 'CHINA_STUDIES'
        | 'JAPAN_STUDIES'
        | 'ENGLISH_STUDIES'
        | 'FRENCH_STUDIES'
        | 'ADVERTISING'
        | 'MEDIA'
        | 'CULTURE'
        | 'ANTHROPOLOGY'
        | 'BUSINESS_ADMINISTRATION'
        | 'ECONOMICS'
        | 'ACTUARIAL_SCIENCE'
        | 'ACCOUNTING'
        | 'INTEGRATED_DESIGN'
        | 'JEWELRY'
        | 'INDUSTRIAL_DESIGN'
        | 'COMMUNICATION_DESIGN'
        | 'MEDIA_DESIGN'
        | 'SPORTS_SCIENCE'
        | 'DANCE'
        | 'MUSIC';
    /**
     * @format int32
     * @default 0
     */
    page?: number;
    /**
     * @format int32
     * @default 10
     */
    size?: number;
}

export interface GetCollageClubsByConditionParams {
    keyword?: string;
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED';
    sortBy?: 'NAME_ASC' | 'CATEGORY_ASC' | 'RECRUITMENT_STATUS_ASC';
    college?:
        | 'GLOBAL_LAW_COMMUNICATION'
        | 'KYUNG_SANG'
        | 'COMMUNICATION_CULTURE'
        | 'ENGINEERING'
        | 'CONVERGENCE'
        | 'SOFTWARE'
        | 'DESIGN'
        | 'PHARMACY'
        | 'SPORT_ARTS'
        | 'LIONS_COLLEGE';
    /**
     * @format int32
     * @default 0
     */
    page?: number;
    /**
     * @format int32
     * @default 10
     */
    size?: number;
}

export interface GetCentralClubsByCondition1Params {
    keyword?: string;
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED';
    sortBy?: 'NAME_ASC' | 'CATEGORY_ASC' | 'RECRUITMENT_STATUS_ASC';
    category?: 'VOLUNTEER' | 'ART' | 'SPORTS' | 'RELIGION' | 'ACADEMIC';
    /**
     * @format int32
     * @default 0
     */
    page?: number;
    /**
     * @format int32
     * @default 10
     */
    size?: number;
}

export interface GetSpecificActivityParams {
    /** @format int64 */
    activityId: number;
}

export interface GetAllActivityParams {
    /** @format int64 */
    clubId: number;
}

export interface DeleteClubSchedulesParams {
    /** @format int64 */
    clubId: number;
    /** @format int64 */
    scheduleId: number;
}
