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

/** DTO for creating a service announcement */
export interface CreateServiceAnnouncementRequestDTO {
    /**
     * Announcement title
     * @example "Server Maintenance Notice"
     */
    title: string;
    /**
     * Announcement content
     * @example "There will be a server maintenance from midnight."
     */
    content: string;
}

export interface ApiResponseObject {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: object;
}

export interface FeedbackRequest {
    content?: string;
}

export interface ApiResponseFeedbackCommandResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: FeedbackCommandResponse;
}

export interface FeedbackCommandResponse {
    /** @format int64 */
    feedbackId?: number;
}

/** DTO for creating a document */
export interface CreateDocumentRequest {
    /**
     * Document title
     * @example "Club Rules"
     */
    title: string;
}

export interface ApiResponseLong {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** @format int64 */
    result?: number;
}

/** Club Category */
export interface CategoryRequest {
    /**
     * Central club category
     * @example "ACADEMIC"
     */
    central?: 'VOLUNTEER' | 'ART' | 'SPORTS' | 'RELIGION' | 'ACADEMIC';
    /**
     * Union club category
     * @example "IT"
     */
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
    /**
     * College
     * @example "SOFTWARE_CONVERGENCE"
     */
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
     * Department
     * @example "COMPUTER_SCIENCE_ENGINEERING"
     */
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

/** DTO for basic club information request */
export interface ClubBasicInformationUpdateRequest {
    /**
     * Club name
     * @example "Hanjari"
     */
    clubName: string;
    /**
     * Club type
     * @example "CENTRAL"
     */
    clubType: 'CENTRAL' | 'UNION' | 'COLLEGE' | 'DEPARTMENT';
    /** Category information */
    category: CategoryRequest;
    /**
     * A short introduction of the club
     * @example "The best central club at Hanyang University ERICA"
     */
    oneLiner: string;
}

export interface ApiResponseClubCommandResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club command response */
    result?: ClubCommandResponse;
}

/** DTO for club command response */
export interface ClubCommandResponse {
    /**
     * Club ID
     * @format int64
     * @example 1
     */
    clubId?: number;
}

export interface ApiResponseVoid {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: object;
}

export interface ApiResponseClubCodeResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club code response */
    result?: ClubCodeResponse;
}

/** DTO for club code response */
export interface ClubCodeResponse {
    /**
     * Club code
     * @example "hanjari"
     */
    code?: string;
}

/** DTO for basic club information request */
export interface ClubBasicInformationRequest {
    /**
     * Club name
     * @example "Hanjari"
     */
    clubName: string;
    /**
     * Leader's email
     * @example "leader@example.com"
     */
    leaderEmail: string;
    /**
     * Club type
     * @example "CENTRAL"
     */
    clubType: 'CENTRAL' | 'UNION' | 'COLLEGE' | 'DEPARTMENT';
    /** Category information */
    category: CategoryRequest;
    /**
     * A short introduction of the club
     * @example "The best central club at Hanyang University ERICA"
     */
    oneLiner: string;
    /**
     * A brief introduction of the club
     * @example "Hanjari is a central club at Hanyang University ERICA."
     */
    briefIntroduction: string;
}

/** DTO for club detail request */
export interface ClubDetailRequest {
    /**
     * Recruitment status
     * @example "OPEN"
     */
    description: string;
    /**
     * Leader's name
     * @example "Gildong Hong"
     */
    leaderName: string;
    /**
     * Leader's phone number
     * @example "010-1234-5678"
     */
    leaderPhone: string;
    /**
     * Contact email
     * @example "hanjari@hanjari.com"
     */
    contactEmail: string;
    /**
     * Membership fee
     * @example 10000
     */
    membershipFee: string;
    /**
     * SNS URL
     * @example "https://www.instagram.com/hanjari_"
     */
    snsAccount?: string;
    /**
     * Application URL
     * @example "https://forms.gle/..."
     */
    applicationUrl?: string;
}

/** DTO for club schedule list request */
export interface ClubScheduleListRequest {
    /** List of club schedules */
    schedules: ClubScheduleRequest[];
    /**
     * Description of the schedule
     * @example "Weekly meetings will be held every Friday at 5 PM."
     */
    scheduleDescription?: string;
}

/** DTO for club schedule request */
export interface ClubScheduleRequest {
    /**
     * Month
     * @format int32
     * @min 1
     * @max 12
     * @example 3
     */
    month: number;
    /**
     * Schedule content
     * @example "General meeting"
     */
    content: string;
    /**
     * Schedule ID (required for updates)
     * @format int64
     * @example 1
     */
    scheduleId?: number;
}

export interface ApiResponseScheduleListResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for schedule list response */
    result?: ScheduleListResponse;
}

/** DTO for schedule list response */
export interface ScheduleListResponse {
    /** List of schedules */
    schedules?: ScheduleResponse[];
}

/** DTO for schedule response */
export interface ScheduleResponse {
    /**
     * Schedule ID
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * Month
     * @format int32
     * @example 3
     */
    month?: number;
    /**
     * Schedule content
     * @example "General meeting"
     */
    content?: string;
}

export interface ApiResponseClubScheduleDraftResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club schedule draft response */
    result?: ClubScheduleDraftResponse;
}

/** DTO for club schedule draft response */
export interface ClubScheduleDraftResponse {
    /** List of club schedule drafts */
    schedules?: ScheduleDraftResponse[];
    /**
     * Total number of elements
     * @format int32
     * @example 10
     */
    totalElements?: number;
    scheduleDescription?: string;
}

/** DTO for schedule draft response */
export interface ScheduleDraftResponse {
    /**
     * Schedule ID
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * Month
     * @format int32
     * @example 3
     */
    month?: number;
    /**
     * Schedule content
     * @example "General meeting"
     */
    content?: string;
}

/** DTO for club recruitment request */
export interface ClubRecruitmentRequest {
    /**
     * Recruitment due date
     * @example "2024-03-31"
     */
    due: string;
    /**
     * Recruitment target
     * @example "All students"
     */
    target?: string;
    /**
     * Recruitment notice
     * @example "Interview after document submission"
     */
    notice: string;
    /**
     * Etc
     * @example "For further questions..."
     */
    etc?: string;
}

/** DTO for club introduction request */
export interface ClubIntroductionRequest {
    /**
     * The introduction of the club
     * @example "Hanjari is..."
     */
    introduction: string;
    /**
     * The activities of the club
     * @example "Regular meeting every Monday"
     */
    activity: string;
    /**
     * Recruitment information
     * @example "Always open"
     */
    recruitment: string;
}

/** DTO for login request */
export interface LoginRequest {
    /**
     * OAuth authorization code
     * @example "authorization_code"
     */
    code: string;
}

export interface ApiResponseLoginResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: LoginResponse;
}

export interface LoginResponse {
    /** @format int64 */
    clubId?: number;
    clubName?: string;
}

/** DTO for creating/updating an announcement */
export interface AnnouncementRequest {
    /**
     * The title of the announcement
     * @example "Recruiting new members for the first semester of 2024"
     */
    title: string;
    /**
     * The URL of the announcement
     * @example "https://www.hanjari.kr/announcement/1"
     */
    url: string;
}

export interface AnnouncementCommandResponse {
    /** @format int64 */
    announcementId?: number;
}

export interface ApiResponseAnnouncementCommandResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: AnnouncementCommandResponse;
}

/** DTO for creating an activity */
export interface CreateActivityRequest {
    /**
     * The content of the activity
     * @example "1st General Meeting of 2024"
     */
    content: string;
    /**
     * The date of the activity
     * @format date
     * @example "2024-03-01"
     */
    date: string;
}

export interface ActivityCommandResponse {
    /** @format int64 */
    activityId?: number;
}

export interface ApiResponseActivityCommandResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ActivityCommandResponse;
}

/** DTO for updating a document */
export interface UpdateDocumentRequest {
    /**
     * Document title
     * @example "Club Rules"
     */
    title: string;
    /**
     * List of file IDs to be removed
     * @example [1,2,3]
     */
    removedFileIdList?: number[];
}

/** DTO for updating an activity */
export interface UpdateActivityRequest {
    /**
     * The content of the activity
     * @example "1st General Meeting of 2024"
     */
    content: string;
    /**
     * The date of the activity
     * @format date
     * @example "2024-03-01"
     */
    date: string;
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
    /** DTO for service announcement search response */
    result?: ServiceAnnouncementSearchDTO;
}

/** DTO for service announcement details */
export interface ServiceAnnouncementDetailDTO {
    /**
     * Service announcement ID
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * Service announcement title
     * @example "Server Maintenance Notice"
     */
    title?: string;
    /**
     * Service announcement content
     * @example "There will be a server maintenance from midnight."
     */
    content?: string;
    /**
     * Creation timestamp
     * @format date-time
     * @example "2024-03-01T10:00:00"
     */
    createdAt?: string;
}

/** DTO for service announcement search response */
export interface ServiceAnnouncementSearchDTO {
    /** List of service announcement details */
    serviceAnnouncements?: ServiceAnnouncementDetailDTO[];
    /**
     * Total number of elements
     * @format int32
     * @example 10
     */
    totalElements?: number;
}

export interface ApiResponseServiceAnnouncementDetailDTO {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for service announcement details */
    result?: ServiceAnnouncementDetailDTO;
}

export interface ApiResponseGetAllDocumentsResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for getting all documents response */
    result?: GetAllDocumentsResponse;
}

/** DTO for document */
export interface DocumentDTO {
    /**
     * Document ID
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * Document title
     * @example "Club Rules"
     */
    title?: string;
    /**
     * Document creation date
     * @format date
     * @example "2024-03-01"
     */
    date?: string;
}

/** DTO for getting all documents response */
export interface GetAllDocumentsResponse {
    /** List of document DTOs */
    documentDTOList?: DocumentDTO[];
}

export interface ApiResponseGetDocumentFilesResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for getting document files response */
    result?: GetDocumentFilesResponse;
}

export interface FileDownloadDTO {
    /** @format int64 */
    fileId?: number;
    fileName?: string;
    extension?: string;
    /** @format int64 */
    size?: number;
    /** @format date-time */
    updatedAt?: string;
    downloadUrl?: string;
}

/** DTO for getting document files response */
export interface GetDocumentFilesResponse {
    /** List of file DTOs */
    fileDTOList?: FileDownloadDTO[];
}

export interface ApiResponseClubDetailListResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club detail list response */
    result?: ClubDetailListResponse;
}

/** DTO for club detail list response */
export interface ClubDetailListResponse {
    /** List of club responses */
    clubs?: ClubResponse[];
    /**
     * Total number of elements
     * @format int32
     * @example 100
     */
    totalElements?: number;
}

/** DTO for club response */
export interface ClubResponse {
    /**
     * Club ID
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * Club name
     * @example "Hanjari"
     */
    name?: string;
    /**
     * Club description (one-liner)
     * @example "The best central club at Hanyang University ERICA"
     */
    description?: string;
    /**
     * Recruitment status
     * @example "RECRUITING"
     */
    recruitmentStatus?:
        | 'UPCOMING'
        | 'OPEN'
        | 'CLOSED'
        | 'ALWAYS_OPEN'
        | 'ADDITIONAL';
    /**
     * Club profile image URL
     * @example "https://.../profile.png"
     */
    profileImageUrl?: string;
    /**
     * Club activities
     * @example "Regular meeting every Monday"
     */
    activities?: string;
    /**
     * Leader's name
     * @example "Gildong Hong"
     */
    leaderName?: string;
    /**
     * Leader's email
     * @example "leader@example.com"
     */
    leaderEmail?: string;
    /**
     * Leader's phone number
     * @example "010-1234-5678"
     */
    leaderPhone?: string;
    /**
     * Membership fee
     * @example 10000
     */
    membershipFee?: string;
    /**
     * SNS URL
     * @example "https://www.instagram.com/hanjari_"
     */
    snsUrl?: string;
    /**
     * Application URL
     * @example "https://forms.gle/..."
     */
    applicationUrl?: string;
    /**
     * Club type
     * @example "CENTRAL"
     */
    clubType?: 'CENTRAL' | 'UNION' | 'COLLEGE' | 'DEPARTMENT';
    tag?: string;
}

export interface ApiResponseClubDetailResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubDetailResponse;
}

export interface ClubDetailResponse {
    /** @format int64 */
    clubId?: number;
    description?: string;
    leaderName?: string;
    leaderPhone?: string;
    contactEmail?: string;
    membershipFee?: string;
    snsAccount?: string;
    applicationUrl?: string;
}

export interface ApiResponseClubScheduleResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club schedule response */
    result?: ClubScheduleResponse;
}

/** DTO for club schedule response */
export interface ClubScheduleResponse {
    /** List of club schedules */
    schedules?: ScheduleResponse[];
    /**
     * Total number of elements
     * @format int32
     * @example 10
     */
    totalElements?: number;
    scheduleDescription?: string;
}

export interface ApiResponseClubRecruitmentResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club recruitment response */
    result?: ClubRecruitmentResponse;
}

/** DTO for club recruitment response */
export interface ClubRecruitmentResponse {
    /**
     * Recruitment due date
     * @example "2024-03-31"
     */
    due?: string;
    /**
     * Recruitment target
     * @example "Undergraduate students"
     */
    target?: string;
    /**
     * Recruitment notice
     * @example "Interview after document submission"
     */
    notice?: string;
    /**
     * Other recruitment information
     * @example "For further questions..."
     */
    etc?: string;
}

export interface ApiResponseClubOverviewResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club overview response */
    result?: ClubOverviewResponse;
}

/** DTO for category response */
export interface CategoryResponse {
    /**
     * Club category name
     * @example "Central Club"
     */
    clubCategoryName?: 'CENTRAL' | 'UNION' | 'COLLEGE' | 'DEPARTMENT';
    /**
     * Central category name
     * @example "Academic"
     */
    centralCategoryName?:
        | 'VOLUNTEER'
        | 'ART'
        | 'SPORTS'
        | 'RELIGION'
        | 'ACADEMIC';
    /**
     * Union category name
     * @example "IT"
     */
    unionCategoryName?:
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
     * College name
     * @example "College of Software Convergence"
     */
    collegeName?:
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
     * Department name
     * @example "Department of Computer Science and Engineering"
     */
    departmentName?:
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

/** DTO for club overview response */
export interface ClubOverviewResponse {
    /**
     * Club ID
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * Club name
     * @example "Hanjari"
     */
    name?: string;
    /**
     * Club description (one-liner)
     * @example "The best central club at Hanyang University ERICA"
     */
    oneLiner?: string;
    /**
     * Recruitment status
     * @example "RECRUITING"
     */
    recruitmentStatus?:
        | 'UPCOMING'
        | 'OPEN'
        | 'CLOSED'
        | 'ALWAYS_OPEN'
        | 'ADDITIONAL';
    /**
     * Club profile image URL
     * @example "https://.../profile.png"
     */
    profileImageUrl?: string;
    /**
     * Application URL
     * @example "https://forms.gle/..."
     */
    applicationUrl?: string;
    /** Club category information */
    category?: CategoryResponse;
    /**
     * Club category tag
     * @example "Academic"
     */
    tag?: string;
}

export interface ApiResponseClubIntroductionResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club introduction response */
    result?: ClubIntroductionResponse;
}

/** DTO for club introduction response */
export interface ClubIntroductionResponse {
    /**
     * Club introduction content
     * @example "Hanjari is..."
     */
    introduction?: string;
    /**
     * Club activity content
     * @example "Regular meeting every Monday"
     */
    activity?: string;
}

export interface ApiResponseClubBasicInfoResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club basic information response (draft) */
    result?: ClubBasicInfoResponse;
}

/** DTO for club basic information response (draft) */
export interface ClubBasicInfoResponse {
    /**
     * Leader's name
     * @example "Gildong Hong"
     */
    leaderName?: string;
    /**
     * Leader's email
     * @example "leader@example.com"
     */
    leaderEmail?: string;
    /**
     * Leader's phone number
     * @example "010-1234-5678"
     */
    leaderPhone?: string;
    /**
     * Club activities
     * @example "Regular meeting every Monday"
     */
    activities?: string;
    /**
     * Membership fee
     * @example 10000
     */
    membershipFee?: string;
    /**
     * SNS URL
     * @example "https://www.instagram.com/hanjari_"
     */
    snsUrl?: string;
}

export interface ApiResponseClubDetailDraftResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club detail draft response */
    result?: ClubDetailDraftResponse;
}

/** DTO for club detail draft response */
export interface ClubDetailDraftResponse {
    /**
     * Club description (one-liner)
     * @example "The best central club at Hanyang University ERICA"
     */
    description?: string;
    /**
     * Leader's name
     * @example "Gildong Hong"
     */
    leaderName?: string;
    /**
     * Leader's phone number
     * @example "010-1234-5678"
     */
    leaderPhone?: string;
    /**
     * Contact email
     * @example "hanjari@hanjari.com"
     */
    contactEmail?: string;
    /**
     * Membership fee
     * @example 10000
     */
    membershipFee?: string;
    /**
     * SNS URL
     * @example "https://www.instagram.com/hanjari_"
     */
    snsAccount?: string;
    /**
     * Application URL
     * @example "https://forms.gle/..."
     */
    applicationUrl?: string;
}

export interface ApiResponseClubSearchResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club search response */
    result?: ClubSearchResponse;
}

/** DTO for club search response */
export interface ClubSearchResponse {
    /** List of club search results */
    content?: ClubSearchResult[];
    /**
     * Total number of elements
     * @format int64
     * @example 100
     */
    totalElements?: number;
    /**
     * Current page number (0-indexed)
     * @format int32
     * @example 0
     */
    page?: number;
    /**
     * Number of elements per page
     * @format int32
     * @example 10
     */
    size?: number;
    /**
     * Total number of pages
     * @format int32
     * @example 10
     */
    totalPages?: number;
}

/** Club search result item */
export interface ClubSearchResult {
    /**
     * Club ID
     * @format int64
     * @example 1
     */
    id?: number;
    /**
     * Club name
     * @example "Hanjari"
     */
    name?: string;
    /**
     * One-liner introduction
     * @example "The best central club at Hanyang University ERICA"
     */
    oneLiner?: string;
    /**
     * Club profile image URL
     * @example "https://.../profile.png"
     */
    profileImageUrl?: string;
    /**
     * Category name
     * @example "Academic"
     */
    categoryName?: string;
    /**
     * Recruitment status
     * @example "RECRUITING"
     */
    recruitmentStatus?:
        | 'UPCOMING'
        | 'OPEN'
        | 'CLOSED'
        | 'ALWAYS_OPEN'
        | 'ADDITIONAL';
    /**
     * Category tag
     * @example "Academic"
     */
    tag?: string;
}

export interface ApiResponseGetRegistrationsResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for getting registrations response */
    result?: GetRegistrationsResponse;
}

/** DTO for club registration response */
export interface ClubRegistrationResponse {
    /**
     * Club registration ID
     * @format int64
     * @example 1
     */
    clubRegistrationId?: number;
    /**
     * Club name
     * @example "Hanjari"
     */
    clubName?: string;
    /**
     * Leader's email
     * @example "leader@example.com"
     */
    leaderEmail?: string;
    /**
     * One-liner introduction
     * @example "The best central club at Hanyang University ERICA"
     */
    oneLiner?: string;
    /**
     * Brief introduction
     * @example "Hanjari is a central club at Hanyang University ERICA."
     */
    briefIntroduction?: string;
    /** Club category information */
    category?: CategoryResponse;
}

/** DTO for getting registrations response */
export interface GetRegistrationsResponse {
    /** List of club registration responses */
    clubRegistrationResponseDTOList?: ClubRegistrationResponse[];
}

export interface ApiResponseGetInstagrams {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: GetInstagrams;
}

export interface ClubInstagramDTO {
    clubName?: string;
    accountName?: string;
    profileImage?: string;
    instagramProfileUrl?: string;
}

export interface GetInstagrams {
    officialAccounts?: ClubInstagramDTO[];
    /** @format int64 */
    totalElements?: number;
    /** @format int32 */
    page?: number;
    /** @format int32 */
    size?: number;
    /** @format int32 */
    totalPage?: number;
}

export interface ApiResponseClubIdResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    result?: ClubIdResponse;
}

export interface ClubIdResponse {
    clubIds?: number[];
    /** @format int64 */
    totalElements?: number;
}

export interface ApiResponseClubRecruitmentDraftResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club recruitment draft response */
    result?: ClubRecruitmentDraftResponse;
}

/** DTO for club recruitment draft response */
export interface ClubRecruitmentDraftResponse {
    /** Club response DTO */
    club?: ClubResponse;
    /**
     * Recruitment due date
     * @example "2024-03-31"
     */
    due?: string;
    /**
     * Recruitment target
     * @example "Undergraduate students"
     */
    target?: string;
    /**
     * Recruitment notice
     * @example "Interview after document submission"
     */
    notice?: string;
    /**
     * Other recruitment information
     * @example "For further questions..."
     */
    etc?: string;
}

export interface ApiResponseClubIntroductionDraftResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for club introduction draft response */
    result?: ClubIntroductionDraftResponse;
}

/** DTO for club introduction draft response */
export interface ClubIntroductionDraftResponse {
    /** Club response DTO */
    club?: ClubResponse;
    /**
     * Club introduction content
     * @example "Hanjari is..."
     */
    introduction?: string;
    /**
     * Club activity content
     * @example "Regular meeting every Monday"
     */
    activity?: string;
    /**
     * Recruitment information
     * @example "Always open"
     */
    recruitment?: string;
}

/** DTO for announcement */
export interface AnnouncementDTO {
    /**
     * Announcement ID
     * @format int64
     * @example 1
     */
    announcementId?: number;
    /**
     * Announcement title
     * @example "Recruiting new members for the first semester of 2024"
     */
    title?: string;
    /**
     * Announcement date
     * @format date
     * @example "2024-03-01"
     */
    date?: string;
    /**
     * Announcement URL
     * @example "https://www.hanjari.kr/announcement/1"
     */
    url?: string;
    /**
     * Thumbnail image URL
     * @example "https://.../thumbnail.png"
     */
    thumbnailUrl?: string;
}

export interface ApiResponseGetAllAnnouncementResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for getting all announcements response */
    result?: GetAllAnnouncementResponse;
}

/** DTO for getting all announcements response */
export interface GetAllAnnouncementResponse {
    /** List of announcement DTOs */
    announcementDTOList?: AnnouncementDTO[];
}

/** DTO for activity image */
export interface ActivityImageDTO {
    /**
     * Image order index
     * @format int32
     * @example 1
     */
    orderIndex?: number;
    /**
     * Image URL
     * @example "https://.../image.png"
     */
    imageUrl?: string;
}

export interface ApiResponseGetSpecificActivityResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for getting a specific activity response */
    result?: GetSpecificActivityResponse;
}

/** DTO for getting a specific activity response */
export interface GetSpecificActivityResponse {
    /**
     * Club name
     * @example "Hanjari"
     */
    clubName?: string;
    /**
     * Club image URL
     * @example "https://.../club.png"
     */
    clubImageUrl?: string;
    /**
     * Activity content
     * @example "1st General Meeting of 2024"
     */
    content?: string;
    /**
     * Activity date
     * @format date
     * @example "2024-03-01"
     */
    date?: string;
    /** List of activity image DTOs */
    activityImageDTOList?: ActivityImageDTO[];
}

/** DTO for activity thumbnail */
export interface ActivityThumbnailDTO {
    /**
     * Activity ID
     * @format int64
     * @example 1
     */
    activityId?: number;
    /**
     * Thumbnail image URL
     * @example "https://.../thumbnail.png"
     */
    thumbnailUrl?: string;
}

export interface ApiResponseGetAllActivityResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for getting all activities response */
    result?: GetAllActivityResponse;
}

/** DTO for getting all activities response */
export interface GetAllActivityResponse {
    /** List of activity thumbnail DTOs */
    activityThumbnailDTOList?: ActivityThumbnailDTO[];
}

export interface ApiResponseRecentActivityLogResponse {
    isSuccess?: boolean;
    code?: string;
    message?: string;
    /** DTO for recent activity log response */
    result?: RecentActivityLogResponse;
}

/** Recent activity log */
export interface RecentActivityLog {
    /**
     * Activity image URL
     * @example "https://.../activity.png"
     */
    imageUrl?: string;
    /**
     * Club ID
     * @format int64
     * @example 1
     */
    clubId?: number;
    /**
     * Club name
     * @example "Hanjari"
     */
    clubName?: string;
    /**
     * Club profile image URL
     * @example "https://.../club_profile.png"
     */
    clubProfileImageUrl?: string;
}

/** DTO for recent activity log response */
export interface RecentActivityLogResponse {
    /** List of recent activity logs */
    activityLogs?: RecentActivityLog[];
}

export interface UpdateClubInfoParams {
    /** @format int64 */
    clubId: number;
}

export interface UpdateClubRecruitmentStatusParams {
    /** @format int32 */
    option: number;
    /** @format int64 */
    clubId: number;
}

export interface AcceptClubUpdateParams {
    /** @format int64 */
    clubRegistrationId: number;
}

export interface DeleteClubUpdateParams {
    /** @format int64 */
    clubRegistrationId: number;
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
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'ALWAYS_OPEN' | 'ADDITIONAL';
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
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'ALWAYS_OPEN' | 'ADDITIONAL';
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

export interface GetClubUpdateListParams {
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

export interface GetAllClubRegistrationsParams {
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

export interface GetInstagramParams {
    clubType: 'CENTRAL' | 'UNION' | 'COLLEGE' | 'DEPARTMENT';
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

export interface GetInstagramUnionParams {
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

export interface GetInstagramDepartmentParams {
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

export interface GetInstagramCollegeParams {
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

export interface GetInstagramCentralParams {
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

export interface GetCentralClubsByConditionParams {
    keyword?: string;
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'ALWAYS_OPEN' | 'ADDITIONAL';
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
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'ALWAYS_OPEN' | 'ADDITIONAL';
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
    status?: 'UPCOMING' | 'OPEN' | 'CLOSED' | 'ALWAYS_OPEN' | 'ADDITIONAL';
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

export interface DeleteClubParams {
    /** @format int64 */
    clubId: number;
}

export interface DeleteClubSchedulesParams {
    /** @format int64 */
    clubId: number;
    /** @format int64 */
    scheduleId: number;
}
