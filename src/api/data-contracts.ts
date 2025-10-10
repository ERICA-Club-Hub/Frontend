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

export interface CategoryDTO {
  central?: "VOLUNTEER" | "ART" | "SPORTS" | "RELIGION" | "ACADEMIC";
  union?:
    | "IT"
    | "MARKETING_AD"
    | "ECONOMY_MANAGEMENT"
    | "VOLUNTEER"
    | "SPORTS"
    | "LANGUAGE"
    | "PRESENTATION"
    | "BOOK"
    | "ETC";
  college?:
    | "GLOBAL_LAW_COMMUNICATION"
    | "KYUNG_SANG"
    | "COMMUNICATION_CULTURE"
    | "ENGINEERING"
    | "CONVERGENCE"
    | "SOFTWARE"
    | "DESIGN"
    | "PHARMACY"
    | "SPORT_ARTS"
    | "LIONS_COLLEGE";
  department?:
    | "ARCHITECTURE"
    | "CONSTRUCTION_ENVIRONMENT"
    | "TRANSPORT_LOGISTICS"
    | "ELECTRICAL_ENGINEERING"
    | "BATTERY_MATERIAL_CHEMICAL"
    | "MATERIAL_CHEMICAL"
    | "MECHANICAL"
    | "INDUSTRIAL_MANAGEMENT"
    | "ROBOT"
    | "FUSION_SYSTEM"
    | "SMART_FUSION"
    | "INTELLIGENT_ROBOT"
    | "ENERGY_BIO"
    | "MARINE_FUSION"
    | "COMPUTER"
    | "ICT"
    | "AI"
    | "DATA"
    | "PHARMACY"
    | "SEMICONDUCTOR"
    | "BIO"
    | "DEFENSE_INTELLIGENCE"
    | "KOREAN_STUDIES"
    | "CHINA_STUDIES"
    | "JAPAN_STUDIES"
    | "ENGLISH_STUDIES"
    | "FRENCH_STUDIES"
    | "ADVERTISING"
    | "MEDIA"
    | "CULTURE"
    | "ANTHROPOLOGY"
    | "BUSINESS_ADMINISTRATION"
    | "ECONOMICS"
    | "ACTUARIAL_SCIENCE"
    | "ACCOUNTING"
    | "INTEGRATED_DESIGN"
    | "JEWELRY"
    | "INDUSTRIAL_DESIGN"
    | "COMMUNICATION_DESIGN"
    | "MEDIA_DESIGN"
    | "SPORTS_SCIENCE"
    | "DANCE"
    | "MUSIC";
}

export interface ClubBasicInformationDTO {
  clubName?: string;
  leaderEmail?: string;
  clubType?: "CENTRAL" | "UNION" | "COLLEGE" | "DEPARTMENT";
  category?: CategoryDTO;
  oneLiner?: string;
  briefIntroduction?: string;
}

export interface ApiResponseString {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: string;
}

export interface ClubDetailRequestDTO {
  recruitmentStatus?: "UPCOMING" | "OPEN" | "CLOSED";
  leaderName?: string;
  leaderPhone?: string;
  activities?: string;
  /** @format int32 */
  membershipFee?: number;
  snsUrl?: string;
  applicationUrl?: string;
}

export interface ClubScheduleListRequestDTO {
  schedules?: ClubScheduleRequestDTO[];
}

export interface ClubScheduleRequestDTO {
  /** @format int32 */
  month?: number;
  content?: string;
  /** @format int64 */
  scheduleId?: number;
}

export interface ClubRecruitmentRequestDTO {
  due?: string;
  notice?: string;
  etc?: string;
}

export interface ClubIntroductionRequestDTO {
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

export interface ApiResponseClubDetailListResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubDetailListResponseDTO;
}

export interface ClubDetailListResponseDTO {
  clubs?: ClubResponseDTO[];
  /** @format int32 */
  totalElements?: number;
}

export interface ClubResponseDTO {
  /** @format int64 */
  id?: number;
  name?: string;
  description?: string;
  recruitmentStatus?: "UPCOMING" | "OPEN" | "CLOSED";
  profileImageUrl?: string;
  activities?: string;
  leaderName?: string;
  leaderEmail?: string;
  leaderPhone?: string;
  /** @format int32 */
  membershipFee?: number;
  snsUrl?: string;
  applicationUrl?: string;
  clubType?: "CENTRAL" | "UNION" | "COLLEGE" | "DEPARTMENT";
}

export interface ApiResponseClubResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubResponseDTO;
}

export interface ApiResponseClubScheduleResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubScheduleResponseDTO;
}

export interface ClubScheduleResponseDTO {
  schedules?: ScheduleResponseDTO[];
  /** @format int32 */
  totalElements?: number;
}

export interface ScheduleResponseDTO {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  month?: number;
  content?: string;
}

export interface ApiResponseClubRecruitmentResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubRecruitmentResponseDTO;
}

export interface ClubRecruitmentResponseDTO {
  due?: string;
  target?: string;
  notice?: string;
  etc?: string;
}

export interface ApiResponseClubOverviewResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubOverviewResponseDTO;
}

export interface CategoryResponseDTO {
  clubCategoryName?: string;
  centralCategoryName?: string;
  unionCategoryName?: string;
  collegeName?: string;
  departmentName?: string;
}

export interface ClubOverviewResponseDTO {
  /** @format int64 */
  id?: number;
  name?: string;
  description?: string;
  recruitmentStatus?: "UPCOMING" | "OPEN" | "CLOSED";
  profileImageUrl?: string;
  applicationUrl?: string;
  category?: CategoryResponseDTO;
}

export interface ApiResponseClubIntroductionResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubIntroductionResponseDTO;
}

export interface ClubIntroductionResponseDTO {
  introduction?: string;
  activity?: string;
}

export interface ApiResponseClubBasicInfoResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubBasicInfoResponseDTO;
}

export interface ClubBasicInfoResponseDTO {
  leaderName?: string;
  leaderEmail?: string;
  leaderPhone?: string;
  activities?: string;
  /** @format int32 */
  membershipFee?: number;
  snsUrl?: string;
}

export interface ApiResponseClubDetailDraftResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubDetailDraftResponseDTO;
}

export interface ClubDetailDraftResponseDTO {
  name?: string;
  description?: string;
  recruitmentStatus?: "UPCOMING" | "OPEN" | "CLOSED";
  leaderName?: string;
  leaderPhone?: string;
  activities?: string;
  /** @format int32 */
  membershipFee?: number;
  snsUrl?: string;
  applicationUrl?: string;
  profileImageUrl?: string;
  category?: CategoryResponseDTO;
}

export interface ApiResponseClubSearchResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubSearchResponseDTO;
}

export interface ClubSearchResponseDTO {
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
  recruitmentStatus?: "UPCOMING" | "OPEN" | "CLOSED";
}

export interface ApiResponseGetRegistrationsResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: GetRegistrationsResponseDTO;
}

export interface ClubRegistrationDTO {
  /** @format int64 */
  clubRegistrationId?: number;
  clubName?: string;
  leaderEmail?: string;
  oneLiner?: string;
  briefIntroduction?: string;
  category?: CategoryResponseDTO;
}

export interface GetRegistrationsResponseDTO {
  clubRegistrationDTOList?: ClubRegistrationDTO[];
}

export interface ApiResponseClubScheduleDraftResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubScheduleDraftResponseDTO;
}

export interface ClubScheduleDraftResponseDTO {
  schedules?: ScheduleDraftResponseDTO[];
  /** @format int32 */
  totalElements?: number;
}

export interface ScheduleDraftResponseDTO {
  /** @format int64 */
  id?: number;
  /** @format int32 */
  month?: number;
  content?: string;
}

export interface ApiResponseClubRecruitmentDraftResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubRecruitmentDraftResponseDTO;
}

export interface ClubRecruitmentDraftResponseDTO {
  club?: ClubResponseDTO;
  due?: string;
  notice?: string;
  etc?: string;
}

export interface ApiResponseClubIntroductionDraftResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ClubIntroductionDraftResponseDTO;
}

export interface ClubIntroductionDraftResponseDTO {
  club?: ClubResponseDTO;
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
  category?: "VOLUNTEER" | "ART" | "SPORTS" | "RELIGION" | "ACADEMIC";
  status?: "UPCOMING" | "OPEN" | "CLOSED";
  sortBy?: "NAME_ASC" | "CATEGORY_ASC" | "RECRUITMENT_STATUS_ASC";
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
  status?: "UPCOMING" | "OPEN" | "CLOSED";
  sortBy?: "NAME_ASC" | "CATEGORY_ASC" | "RECRUITMENT_STATUS_ASC";
  category?:
    | "IT"
    | "MARKETING_AD"
    | "ECONOMY_MANAGEMENT"
    | "VOLUNTEER"
    | "SPORTS"
    | "LANGUAGE"
    | "PRESENTATION"
    | "BOOK"
    | "ETC";
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
  status?: "UPCOMING" | "OPEN" | "CLOSED";
  sortBy?: "NAME_ASC" | "CATEGORY_ASC" | "RECRUITMENT_STATUS_ASC";
  college?:
    | "GLOBAL_LAW_COMMUNICATION"
    | "KYUNG_SANG"
    | "COMMUNICATION_CULTURE"
    | "ENGINEERING"
    | "CONVERGENCE"
    | "SOFTWARE"
    | "DESIGN"
    | "PHARMACY"
    | "SPORT_ARTS"
    | "LIONS_COLLEGE";
  department?:
    | "ARCHITECTURE"
    | "CONSTRUCTION_ENVIRONMENT"
    | "TRANSPORT_LOGISTICS"
    | "ELECTRICAL_ENGINEERING"
    | "BATTERY_MATERIAL_CHEMICAL"
    | "MATERIAL_CHEMICAL"
    | "MECHANICAL"
    | "INDUSTRIAL_MANAGEMENT"
    | "ROBOT"
    | "FUSION_SYSTEM"
    | "SMART_FUSION"
    | "INTELLIGENT_ROBOT"
    | "ENERGY_BIO"
    | "MARINE_FUSION"
    | "COMPUTER"
    | "ICT"
    | "AI"
    | "DATA"
    | "PHARMACY"
    | "SEMICONDUCTOR"
    | "BIO"
    | "DEFENSE_INTELLIGENCE"
    | "KOREAN_STUDIES"
    | "CHINA_STUDIES"
    | "JAPAN_STUDIES"
    | "ENGLISH_STUDIES"
    | "FRENCH_STUDIES"
    | "ADVERTISING"
    | "MEDIA"
    | "CULTURE"
    | "ANTHROPOLOGY"
    | "BUSINESS_ADMINISTRATION"
    | "ECONOMICS"
    | "ACTUARIAL_SCIENCE"
    | "ACCOUNTING"
    | "INTEGRATED_DESIGN"
    | "JEWELRY"
    | "INDUSTRIAL_DESIGN"
    | "COMMUNICATION_DESIGN"
    | "MEDIA_DESIGN"
    | "SPORTS_SCIENCE"
    | "DANCE"
    | "MUSIC";
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
  status?: "UPCOMING" | "OPEN" | "CLOSED";
  sortBy?: "NAME_ASC" | "CATEGORY_ASC" | "RECRUITMENT_STATUS_ASC";
  college?:
    | "GLOBAL_LAW_COMMUNICATION"
    | "KYUNG_SANG"
    | "COMMUNICATION_CULTURE"
    | "ENGINEERING"
    | "CONVERGENCE"
    | "SOFTWARE"
    | "DESIGN"
    | "PHARMACY"
    | "SPORT_ARTS"
    | "LIONS_COLLEGE";
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
  status?: "UPCOMING" | "OPEN" | "CLOSED";
  sortBy?: "NAME_ASC" | "CATEGORY_ASC" | "RECRUITMENT_STATUS_ASC";
  category?: "VOLUNTEER" | "ART" | "SPORTS" | "RELIGION" | "ACADEMIC";
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
