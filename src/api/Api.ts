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

import {
  AcceptClubRegistrationParams,
  AcceptClubUpdateParams,
  AnnouncementRequest,
  ApiResponseActivityCommandResponse,
  ApiResponseAnnouncementCommandResponse,
  ApiResponseClubAdminDetailResponse,
  ApiResponseClubBasicInfoResponse,
  ApiResponseClubCodeResponse,
  ApiResponseClubCommandResponse,
  ApiResponseClubDetailDraftResponse,
  ApiResponseClubDetailListResponse,
  ApiResponseClubDetailResponse,
  ApiResponseClubIdResponse,
  ApiResponseClubIntroductionDraftResponse,
  ApiResponseClubIntroductionResponse,
  ApiResponseClubOverviewResponse,
  ApiResponseClubRecruitmentDraftResponse,
  ApiResponseClubRecruitmentResponse,
  ApiResponseClubScheduleDraftResponse,
  ApiResponseClubScheduleResponse,
  ApiResponseClubSearchResponse,
  ApiResponseFeedbackCommandResponse,
  ApiResponseGetAllActivityResponse,
  ApiResponseGetAllAnnouncementResponse,
  ApiResponseGetAllDocumentsResponse,
  ApiResponseGetDocumentFilesResponse,
  ApiResponseGetFeedbacksResponse,
  ApiResponseGetInstagrams,
  ApiResponseGetInstagramsMain,
  ApiResponseGetRegistrationResponse,
  ApiResponseGetRegistrationsResponse,
  ApiResponseGetSpecificActivityResponse,
  ApiResponseLoginResponse,
  ApiResponseLong,
  ApiResponseObject,
  ApiResponseRecentActivityLogResponse,
  ApiResponseScheduleListResponse,
  ApiResponseServiceAnnouncementDetailDTO,
  ApiResponseServiceAnnouncementSearchDTO,
  ApiResponseVoid,
  ClubBasicInformationRequest,
  ClubBasicInformationUpdateRequest,
  ClubDetailRequest,
  ClubIntroductionRequest,
  ClubRecruitmentRequest,
  ClubScheduleListRequest,
  CreateActivityRequest,
  CreateDocumentRequest,
  CreateServiceAnnouncementRequestDTO,
  DeleteActivityParams,
  DeleteAnnouncementParams,
  DeleteClubParams,
  DeleteClubRegistrationParams,
  DeleteClubSchedulesParams,
  DeleteClubUpdateParams,
  DeleteDocumentParams,
  DeleteServiceAnnouncementParams,
  FeedbackRequest,
  GetAllActivityParams,
  GetAllClubRegistrationsParams,
  GetAllFeedbacksParams,
  GetAllServiceAnnouncementsParams,
  GetCentralClubsByCondition1Params,
  GetCentralClubsByConditionParams,
  GetClubAdminDetailParams,
  GetClubIntroductionDraftParams,
  GetClubIntroductionParams,
  GetClubRecruitmentDraftParams,
  GetClubRecruitmentParams,
  GetClubRegistrationParams,
  GetClubsByConditionParams,
  GetClubSchedulesDraftParams,
  GetClubSchedulesParams,
  GetClubUpdateListParams,
  GetCollageClubsByConditionParams,
  GetDocumentFilesParams,
  GetInstagramCentralParams,
  GetInstagramCollegeParams,
  GetInstagramDepartmentParams,
  GetInstagramParams,
  GetInstagramUnionParams,
  GetPopularClubsParams,
  GetServiceAnnouncementParams,
  GetSpecificActivityParams,
  GetSpecificClubBasicInfoParams,
  GetSpecificClubDraftParams,
  GetSpecificClubOverviewParams,
  GetSpecificClubParams,
  GetUnionClubsByConditionParams,
  LoginRequest,
  PostClubIntroductionDraftParams,
  PostClubIntroductionParams,
  PostClubRecruitmentDraftParams,
  PostClubRecruitmentParams,
  PostClubSchedulesDraftParams,
  PostClubSchedulesParams,
  PostNewActivityParams,
  PostSpecificClubDraftParams,
  PostSpecificClubParams,
  RecruitmentAlertSubscribeRequest,
  ReissueClubCodeParams,
  SubscribeRecruitmentAlertParams,
  UpdateActivityParams,
  UpdateActivityRequest,
  UpdateAnnouncementParams,
  UpdateClubInfoParams,
  UpdateClubRecruitmentStatusParams,
  UpdateDocumentParams,
  UpdateDocumentRequest,
  UpdateServiceAnnouncementParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 서비스 공지사항을 생성합니다. ### Request Body - **title** : 제목 - **content** : 내용
   *
   * @tags Service Announcements
   * @name CreateServiceAnnouncement
   * @summary [서비스 공지사항] 서비스 공지사항 생성
   * @request POST:/api/service-announcements/service-admin
   * @secure
   */
  createServiceAnnouncement = (
    data: CreateServiceAnnouncementRequestDTO,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseObject, any>({
      path: `/api/service-announcements/service-admin`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Feedback
   * @name GetAllFeedbacks
   * @request GET:/api/feedbacks
   * @secure
   */
  getAllFeedbacks = (
    query: GetAllFeedbacksParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetFeedbacksResponse, any>({
      path: `/api/feedbacks`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 피드백을 제출합니다. ### Requset #### requestBody (JSON) - **content**: 내용
   *
   * @tags Feedback
   * @name CreateFeedback
   * @summary [피드백] 피드백 제출
   * @request POST:/api/feedbacks
   * @secure
   */
  createFeedback = (data: FeedbackRequest, params: RequestParams = {}) =>
    this.request<ApiResponseFeedbackCommandResponse, any>({
      path: `/api/feedbacks`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 자료실에 업로드된 파일을 전체 조회합니다. ### Response #### documentDTOList - **documentId**: 자료 ID - **title**: 자료 제목
   *
   * @tags Documents
   * @name GetAllDocuments
   * @summary [자료실] 자료 전체 조회
   * @request GET:/api/documents
   * @secure
   */
  getAllDocuments = (params: RequestParams = {}) =>
    this.request<ApiResponseGetAllDocumentsResponse, any>({
      path: `/api/documents`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 자료실에 파일을 업로드합니다. ### Request #### requestBody (JSON) - **title**: 제목 #### files (multipart/form-data 리스트) - **업로드할 파일 리스트** ### Response - **생성된 document의 ID**
   *
   * @tags Documents
   * @name PostNewDocument
   * @summary [자료실] 자료 업로드
   * @request POST:/api/documents
   * @secure
   */
  postNewDocument = (
    data: {
      /** DTO for creating a document */
      requestBody: CreateDocumentRequest;
      files: File[];
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseLong, any>({
      path: `/api/documents`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 동아리 기본 정보를 수정합니다. ### RequestBody - **name**: 동아리명 - **category**: 동아리 카테고리(SPORTS, ART) - **oneLiner**: 동아리 한줄소개 - **clubType**: 동아리 유형(CENTRAL, UNION, COLLEGE, DEPARTMENT) + 카테고리와 관련된 디테일한 내용은 슬랙을 참고해주세요. ### Multipart/form-data - **image**: 동아리 대표 사진
   *
   * @tags Club Basic
   * @name UpdateClubInfo
   * @summary [동아리 기본] 동아리 기본 정보 수정 요청
   * @request POST:/api/clubs/{clubId}/update
   * @secure
   */
  updateClubInfo = (
    { clubId, ...query }: UpdateClubInfoParams,
    data: {
      /** DTO for basic club information request */
      requestBody: ClubBasicInformationUpdateRequest;
      /** @format binary */
      image: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/${clubId}/update`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description ## 동아리 모집 상태를 변경합니다. ### Path Variable - **clubId**: 변경할 동아리의 ID ### Request Param - **option**: 변경할 모집 상태 (0: 모집예정, 1: 모집중, 2: 모집마감, 3: 상시모집, 4: ADDITIONAL)
   *
   * @tags Club Basic
   * @name UpdateClubRecruitmentStatus
   * @summary [동아리 기본] 동아리 모집 상태 변경
   * @request POST:/api/clubs/{clubId}/recruitment-status
   * @secure
   */
  updateClubRecruitmentStatus = (
    { clubId, ...query }: UpdateClubRecruitmentStatusParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/clubs/${clubId}/recruitment-status`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 모집이 시작될 때 받을 이메일을 등록합니다. ### Path Variable - **clubId**: 알림을 신청할 동아리 ID ### Request Body - **email**: 알림 수신 이메일
   *
   * @tags Club Basic
   * @name SubscribeRecruitmentAlert
   * @summary [동아리 기본] 모집 시작 알림 신청
   * @request POST:/api/clubs/{clubId}/recruitment-alerts
   * @secure
   */
  subscribeRecruitmentAlert = (
    { clubId, ...query }: SubscribeRecruitmentAlertParams,
    data: RecruitmentAlertSubscribeRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/clubs/${clubId}/recruitment-alerts`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 동아리 수정 요청을 수락합니다. ### PathVariable - **clubRegistrationId**: 수락하려는 clubRegistration의 ID ### Response - **수락 후 수정된 club의 id**
   *
   * @tags Club Basic
   * @name AcceptClubUpdate
   * @summary [동아리 수정] 동아리 수정 요청 수락
   * @request POST:/api/clubs/service-admin/updates/{clubRegistrationId}
   * @secure
   */
  acceptClubUpdate = (
    { clubRegistrationId, ...query }: AcceptClubUpdateParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/service-admin/updates/${clubRegistrationId}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 수정 요청을 삭제합니다. ### PathVariable - **clubRegistrationId**: 삭제하려는 clubRegistration의 ID ### Response - 없음
   *
   * @tags Club Basic
   * @name DeleteClubUpdate
   * @summary [동아리 수정] 동아리 수정 요청 삭제
   * @request DELETE:/api/clubs/service-admin/updates/{clubRegistrationId}
   * @secure
   */
  deleteClubUpdate = (
    { clubRegistrationId, ...query }: DeleteClubUpdateParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/clubs/service-admin/updates/${clubRegistrationId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리의 인증 코드를 재발급합니다(기존 인증 코드 대체). - **clubId**: 동아리 ID
   *
   * @tags Club Verification Code
   * @name ReissueClubCode
   * @summary [인증] 동아리 인증 코드 재발급
   * @request POST:/api/clubs/service-admin/reissue
   * @secure
   */
  reissueClubCode = (
    query: ReissueClubCodeParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCodeResponse, any>({
      path: `/api/clubs/service-admin/reissue`,
      method: "POST",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 등록 요청된 동아리를 조회합니다. ### PathVariable - **clubRegistrationId**: 조회하려는 clubRegistration의 ID
   *
   * @tags Club Registration
   * @name GetClubRegistration
   * @summary [동아리 등록] 등록 요청 동아리 상세 조회
   * @request GET:/api/clubs/service-admin/registrations/{clubRegistrationId}
   * @secure
   */
  getClubRegistration = (
    { clubRegistrationId, ...query }: GetClubRegistrationParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetRegistrationResponse, any>({
      path: `/api/clubs/service-admin/registrations/${clubRegistrationId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 등록 요청을 수락하여 동아리로 등록합니다. ### PathVariable - **clubRegistrationId**: 수락하려는 clubRegistration의 ID ### Response - **수락 후 새로 등록된 club의 id**
   *
   * @tags Club Registration
   * @name AcceptClubRegistration
   * @summary [동아리 등록] 동아리 등록 요청 수락
   * @request POST:/api/clubs/service-admin/registrations/{clubRegistrationId}
   * @secure
   */
  acceptClubRegistration = (
    { clubRegistrationId, ...query }: AcceptClubRegistrationParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/service-admin/registrations/${clubRegistrationId}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 등록 요청을 삭제합니다. ### PathVariable - **clubRegistrationId**: 삭제하려는 clubRegistration의 ID ### Response - 없음
   *
   * @tags Club Registration
   * @name DeleteClubRegistration
   * @summary [동아리 등록] 동아리 등록 요청 삭제
   * @request DELETE:/api/clubs/service-admin/registrations/{clubRegistrationId}
   * @secure
   */
  deleteClubRegistration = (
    { clubRegistrationId, ...query }: DeleteClubRegistrationParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/clubs/service-admin/registrations/${clubRegistrationId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 등록을 요청합니다. ### Request #### requestBody (JSON) - **clubName**: 동아리명 - **leaderEmail**: 대표자 이메일(승인 관련 메일 받을 이메일) - **category**: 동아리 카테고리(SPORTS, ART, VOLUNTEER, UNION, ACADEMIC, RELIGION) - **oneLiner**: 동아리 한줄소개 - **briefIntroduction**: 동아리 간단소개 - **clubType**: 동아리 유형(CENTRAL, UNION, COLLEGE, DEPARTMENT) + 카테고리와 관련된 디테일한 내용은 슬랙을 참고해주세요. #### image (multipart/form-data) - **동아리 대표 이미지** ### Response - **생성된 ClubRegistration의 id**
   *
   * @tags Club Registration
   * @name RequestClubRegistration
   * @summary [동아리 등록] 동아리 등록 요청
   * @request POST:/api/clubs/registrations
   * @secure
   */
  requestClubRegistration = (
    data: {
      /** DTO for basic club information request */
      requestBody: ClubBasicInformationRequest;
      /** @format binary */
      image: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/registrations`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description ## 동아리 상세 정보를 입력합니다. ### Path Variable - **clubId**: 입력할 동아리의 ID
   *
   * @tags Club Detail
   * @name PostSpecificClub
   * @summary [동아리 상세] 동아리 상세 정보 입력 및 수정
   * @request POST:/api/clubs/club-admin/{clubId}
   * @secure
   */
  postSpecificClub = (
    { clubId, ...query }: PostSpecificClubParams,
    data: ClubDetailRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/club-admin/${clubId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 동아리 월 별 일정을 입력 및 수정합니다. ### Path Variable - **clubId**: 입력할 동아리의 ID ### Request Body - **month**: 월 (integer, 1~12 사이) - **content**: 일정 내용 (string, 30자 미만) - **scheduleId**: 일정 ID (수정 시에만 필요) - **scheduleDescription** : 동아리 활동 설명
   *
   * @tags Club Intro - Schedules
   * @name PostClubSchedules
   * @summary [동아리 소개] 동아리 월 별 일정 입력 및 수정
   * @request POST:/api/clubs/club-admin/{clubId}/schedules
   * @secure
   */
  postClubSchedules = (
    { clubId, ...query }: PostClubSchedulesParams,
    data: ClubScheduleListRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseScheduleListResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/schedules`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 임시 저장 된 동아리 월 별 일정을 조회합니다. - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Intro - Schedules
   * @name GetClubSchedulesDraft
   * @summary [동아리 소개] 임시 저장된 동아리 월 별 일정 조회
   * @request GET:/api/clubs/club-admin/{clubId}/schedules/draft
   * @secure
   */
  getClubSchedulesDraft = (
    { clubId, ...query }: GetClubSchedulesDraftParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubScheduleDraftResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/schedules/draft`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 월 별 일정을 임시 저장합니다. ### Path Variable - **clubId**: 입력할 동아리의 ID ### Request Body - **month**: 월 (integer, 1~12 사이) - **content**: 일정 내용 (string, 30자 미만) - **scheduleId**: 일정 ID (수정 시에만 필요) - **scheduleDescription** : 동아리 활동 설명
   *
   * @tags Club Intro - Schedules
   * @name PostClubSchedulesDraft
   * @summary [동아리 소개] 동아리 월 별 일정 임시 저장
   * @request POST:/api/clubs/club-admin/{clubId}/schedules/draft
   * @secure
   */
  postClubSchedulesDraft = (
    { clubId, ...query }: PostClubSchedulesDraftParams,
    data: ClubScheduleListRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubScheduleDraftResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/schedules/draft`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 동아리 모집 안내를 입력 및 수정합니다. 입력된 동아리 모집 안내가 없을 경우 새로 생성됩니다. ### Path Variable - **clubId**: 입력할 동아리의 ID ### Request Body - **due**: 모집 기간 - **target**: 모집 대상 - **notice**: 유의사항 - **etc**: 기타사항
   *
   * @tags Club Intro - Recruitment
   * @name PostClubRecruitment
   * @summary [동아리 모집 안내] 동아리 모집 안내 입력 및 수정
   * @request POST:/api/clubs/club-admin/{clubId}/recruitment
   * @secure
   */
  postClubRecruitment = (
    { clubId, ...query }: PostClubRecruitmentParams,
    data: ClubRecruitmentRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/recruitment`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 임시 저장 된 동아리 모집 안내를 조회합니다. - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Intro - Recruitment
   * @name GetClubRecruitmentDraft
   * @summary [동아리 모집 안내] 임시 저장 된 동아리 모집 안내 조회
   * @request GET:/api/clubs/club-admin/{clubId}/recruitment/draft
   * @secure
   */
  getClubRecruitmentDraft = (
    { clubId, ...query }: GetClubRecruitmentDraftParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubRecruitmentDraftResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/recruitment/draft`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 모집 안내를 임시저장 합니다. ### Path Variable - **clubId**: 입력할 동아리의 ID ### Request Body - **due**: 모집 기간 - **target**: 모집 대상 - **notice**: 유의사항 - **etc**: 기타사항
   *
   * @tags Club Intro - Recruitment
   * @name PostClubRecruitmentDraft
   * @summary [동아리 모집 안내] 동아리 모집 안내 임시 저장
   * @request POST:/api/clubs/club-admin/{clubId}/recruitment/draft
   * @secure
   */
  postClubRecruitmentDraft = (
    { clubId, ...query }: PostClubRecruitmentDraftParams,
    data: ClubRecruitmentRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/recruitment/draft`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 동아리 소개글을 입력 및 수정합니다. 입력된 동아리 소개글이 없을 경우 새로 생성됩니다. ### Path Variable - **clubId**: 입력할 동아리의 ID ### Request Body - **introduction**: 동아리 소개 (string, 500자 미만) - **activity**: 활동 내용 (string, 1000자 미만) - **recruitment**: 원하는 동아리 원 설명 (string, 500자 미만)
   *
   * @tags Club Intro - Introduction
   * @name PostClubIntroduction
   * @summary [동아리 소개] 동아리 소개 입력 및 수정
   * @request POST:/api/clubs/club-admin/{clubId}/introduction
   * @deprecated
   * @secure
   */
  postClubIntroduction = (
    { clubId, ...query }: PostClubIntroductionParams,
    data: ClubIntroductionRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/introduction`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 임시 저장 된 동아리 소개글을 조회합니다. - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Intro - Introduction
   * @name GetClubIntroductionDraft
   * @summary [동아리 소개] 임시 저장된 동아리 소개 조회
   * @request GET:/api/clubs/club-admin/{clubId}/introduction/draft
   * @deprecated
   * @secure
   */
  getClubIntroductionDraft = (
    { clubId, ...query }: GetClubIntroductionDraftParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubIntroductionDraftResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/introduction/draft`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 소개글을 임시 저장 합니다. ### Path Variable - **clubId**: 입력할 동아리의 ID ### Request Body - **introduction**: 동아리 소개 (string, 500자 미만) - **activity**: 활동 내용 (string, 1000자 미만) - **recruitment**: 원하는 동아리 원 설명 (string, 500자 미만)
   *
   * @tags Club Intro - Introduction
   * @name PostClubIntroductionDraft
   * @summary [동아리 소개] 동아리 소개 임시 저장
   * @request POST:/api/clubs/club-admin/{clubId}/introduction/draft
   * @deprecated
   * @secure
   */
  postClubIntroductionDraft = (
    { clubId, ...query }: PostClubIntroductionDraftParams,
    data: ClubIntroductionRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/introduction/draft`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 동아리 상세 정보를 임시저장합니다. ### Path Variable - **clubId**: 입력할 동아리의 ID
   *
   * @tags Club Detail
   * @name PostSpecificClubDraft
   * @summary [동아리 상세] 동아리 상세 정보 임시저장
   * @request POST:/api/clubs/club-admin/{clubId}/draft
   * @secure
   */
  postSpecificClubDraft = (
    { clubId, ...query }: PostSpecificClubDraftParams,
    data: ClubDetailRequest,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubCommandResponse, any>({
      path: `/api/clubs/club-admin/${clubId}/draft`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 로그아웃을 수행합니다. Access Token을 무효화합니다.
   *
   * @tags Auth
   * @name Logout
   * @summary [인증] 로그아웃
   * @request POST:/api/auth/logout
   * @secure
   */
  logout = (params: RequestParams = {}) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/auth/logout`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description ## 로그인을 수행합니다. JWT 기반 Access Token을 발급합니다. ### Request - **code**: 인증 코드 ### Response - **clubId**: 동아리 Id - **clubName**: 동아리명
   *
   * @tags Auth
   * @name Login
   * @summary [인증] 로그인
   * @request POST:/api/auth/login
   * @secure
   */
  login = (data: LoginRequest, params: RequestParams = {}) =>
    this.request<ApiResponseLoginResponse, any>({
      path: `/api/auth/login`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 총동연 공지사항을 생성합니다. ### Request #### requestBody (JSON) - **title**: 공지사항 제목 - **url**: 링크 URL #### thumbnail (multipart/form-data) - **썸네일 이미지 파일** ### Response - **생성된 공지사항의 ID**
   *
   * @tags Announcements
   * @name PostNewAnnouncement
   * @summary [총동연 공지사항] 총동연 공지사항 생성
   * @request POST:/api/announcements/union-admin
   * @secure
   */
  postNewAnnouncement = (
    data: {
      /** DTO for creating/updating an announcement */
      requestBody: AnnouncementRequest;
      /** @format binary */
      thumbnail: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseAnnouncementCommandResponse, any>({
      path: `/api/announcements/union-admin`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description ## 동아리 활동로그를 게시합니다. ### PathVariable #### clubId: club의 ID ### Request #### requestBody (JSON) - **content**: 제목 - **date**: 날짜 #### images (multipart/form-data 리스트) - **업로드할 이미지 리스트** ### Response - **생성된 activity의 ID**
   *
   * @tags Activity Logs
   * @name PostNewActivity
   * @summary [활동로그] 활동로그 게시
   * @request POST:/api/activities/club-admin/{clubId}
   * @secure
   */
  postNewActivity = (
    { clubId, ...query }: PostNewActivityParams,
    data: {
      /** DTO for creating an activity */
      requestBody: CreateActivityRequest;
      images: File[];
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseActivityCommandResponse, any>({
      path: `/api/activities/club-admin/${clubId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 서비스 공지사항을 삭제합니다. ### Path Variables - **id** : 삭제 할 서비스 공지사항 ID
   *
   * @tags Service Announcements
   * @name DeleteServiceAnnouncement
   * @summary [서비스 공지사항] 특정 서비스 공지사항 삭제
   * @request DELETE:/api/service-announcements/service-admin/{id}
   * @secure
   */
  deleteServiceAnnouncement = (
    { id, ...query }: DeleteServiceAnnouncementParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseObject, any>({
      path: `/api/service-announcements/service-admin/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 특정 서비스 공지사항을 수정합니다. ### Path Variables - **id** : 수정 할 서비스 공지사항 ID ### Request Body - **title** : 제목 - **content** : 내용
   *
   * @tags Service Announcements
   * @name UpdateServiceAnnouncement
   * @summary [서비스 공지사항] 특정 서비스 공지사항 수정
   * @request PATCH:/api/service-announcements/service-admin/{id}
   * @secure
   */
  updateServiceAnnouncement = (
    { id, ...query }: UpdateServiceAnnouncementParams,
    data: CreateServiceAnnouncementRequestDTO,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseObject, any>({
      path: `/api/service-announcements/service-admin/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 특정 자료의 파일을 조회합니다. ### PathVariable #### documentId: 조회할 document의 ID ### Response #### fileDTOList - **fileDTO** 객체들의 리스트 #### fileDTO - **fileName**: 파일 이름 - **downloadUrl**: 다운로드 URL
   *
   * @tags Documents
   * @name GetDocumentFiles
   * @summary [자료실] 자료 파일 조회
   * @request GET:/api/documents/{documentId}
   * @secure
   */
  getDocumentFiles = (
    { documentId, ...query }: GetDocumentFilesParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetDocumentFilesResponse, any>({
      path: `/api/documents/${documentId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 자료를 삭제합니다. ### PathVariable #### documentId: 삭제할 document의 ID
   *
   * @tags Documents
   * @name DeleteDocument
   * @summary [자료실] 자료 삭제
   * @request DELETE:/api/documents/{documentId}
   * @secure
   */
  deleteDocument = (
    { documentId, ...query }: DeleteDocumentParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/documents/${documentId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description ## 자료를 수정합니다. ### PathVariable #### documentId: 수정할 document의 ID ### Request #### requestBody (JSON) - **title**: 수정할 제목 - **removedFileIDList**: 삭제할 파일 ID 리스트 #### files (multipart/form-data 리스트) - **새롭게 추가할 파일 리스트(필수 x, 있는 경우에만 입력)**
   *
   * @tags Documents
   * @name UpdateDocument
   * @summary [자료실] 자료 수정
   * @request PATCH:/api/documents/{documentId}
   * @secure
   */
  updateDocument = (
    { documentId, ...query }: UpdateDocumentParams,
    data: {
      /** DTO for updating a document */
      requestBody: UpdateDocumentRequest;
      files?: File[];
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/documents/${documentId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description ## 총동연 공지사항을 삭제합니다. ### PathVariable #### announcementId: 삭제할 공지사항의 ID
   *
   * @tags Announcements
   * @name DeleteAnnouncement
   * @summary [총동연 공지사항] 총동연 공지사항 삭제
   * @request DELETE:/api/announcements/union-admin/{announcementId}
   * @secure
   */
  deleteAnnouncement = (
    { announcementId, ...query }: DeleteAnnouncementParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/announcements/union-admin/${announcementId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description ## 총동연 공지사항을 수정합니다. ### PathVariable #### announcementId: 수정할 공지사항의 ID ### Request #### requestBody (JSON) - **title**: 공지사항 제목 - **url**: 링크 URL #### thumbnail (multipart/form-data) - **썸네일 이미지 (필수 X, 이미지도 수정하는 경우에만 입력)**
   *
   * @tags Announcements
   * @name UpdateAnnouncement
   * @summary [총동연 공지사항] 총동연 공지사항 수정
   * @request PATCH:/api/announcements/union-admin/{announcementId}
   * @secure
   */
  updateAnnouncement = (
    { announcementId, ...query }: UpdateAnnouncementParams,
    data: {
      /** DTO for creating/updating an announcement */
      requestBody: AnnouncementRequest;
      /** @format binary */
      thumbnail?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseAnnouncementCommandResponse, any>({
      path: `/api/announcements/union-admin/${announcementId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description ## 활동로그를 삭제합니다. ### PathVariable #### activityId: 삭제할 activity의 ID
   *
   * @tags Activity Logs
   * @name DeleteActivity
   * @summary [활동로그] 활동로그 삭제
   * @request DELETE:/api/activities/club-admin/{activityId}
   * @secure
   */
  deleteActivity = (
    { activityId, ...query }: DeleteActivityParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/activities/club-admin/${activityId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description ## 활동로그를 수정합니다. ### PathVariable #### activityId: 수정할 activity의 ID ### Request #### requestBody (JSON) (필수) - **content**: 수정할 내용 - **date**: 수정할 날짜 #### files (multipart/form-data 리스트) - **새롭게 추가할 이미지 리스트(필수 x, 이미지 추가/삭제/수정이 있는 경우에만 입력)**
   *
   * @tags Activity Logs
   * @name UpdateActivity
   * @summary [활동로그] 활동로그 수정
   * @request PATCH:/api/activities/club-admin/{activityId}
   * @secure
   */
  updateActivity = (
    { activityId, ...query }: UpdateActivityParams,
    data: {
      /** DTO for updating an activity */
      requestBody: UpdateActivityRequest;
      images?: File[];
    },
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/activities/club-admin/${activityId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 모든 서비스 공지사항을 페이징 조회합니다. 제목, 내용, 작성 일자를 반환합니다. 공지사항 작성 일자를 기준으로 내림차순 정렬합니다. (최근 생성한 공지사항이 먼저 반환) ### Query Parameters - **page** : 페이지 번호 (0부터 시작) - **size** : 한 페이지에 보여질 아이템 개수
   *
   * @tags Service Announcements
   * @name GetAllServiceAnnouncements
   * @summary [서비스 공지사항] 모든 서비스 공지사항 조회
   * @request GET:/api/service-announcements
   * @secure
   */
  getAllServiceAnnouncements = (
    query: GetAllServiceAnnouncementsParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseServiceAnnouncementSearchDTO, any>({
      path: `/api/service-announcements`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 특정 서비스 공지사항을 조회합니다. 제목, 내용, 작성 일자를 반환합니다. ### Path Variables - **id** : 조회 할 서비스 공지사항 ID
   *
   * @tags Service Announcements
   * @name GetServiceAnnouncement
   * @summary [서비스 공지사항] 특정 서비스 공지사항 조회
   * @request GET:/api/service-announcements/{id}
   * @secure
   */
  getServiceAnnouncement = (
    { id, ...query }: GetServiceAnnouncementParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseServiceAnnouncementDetailDTO, any>({
      path: `/api/service-announcements/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 입력한 조건에 맞는 동아리를 검색합니다. - **keyword**: 동아리 이름에서 서 검색할 키워드 - **category**: 동아리 카테고리 - **status**: 동아리 모집 상태 - **sortBy**: 정렬 기준 ### 모든 조건은 선택적으로 입력할 수 있습니다. (필수 X) 아무 값도 입력 하지 않을 경우, 가나다순으로 정렬하여 전체 동아리를 조회합니다. page의 기본 값은 0, size의 기본 값은 10입니다.
   *
   * @tags Club Search v1
   * @name GetClubsByCondition
   * @summary [동아리 검색] 동아리 검색
   * @request GET:/api/clubs
   * @deprecated
   * @secure
   */
  getClubsByCondition = (
    query: GetClubsByConditionParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubDetailListResponse, any>({
      path: `/api/clubs`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 상세 정보를 조회합니다. - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Detail
   * @name GetSpecificClub
   * @summary [동아리 정보] 동아리 상세 정보 조회
   * @request GET:/api/clubs/{clubId}
   * @secure
   */
  getSpecificClub = (
    { clubId, ...query }: GetSpecificClubParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubDetailResponse, any>({
      path: `/api/clubs/${clubId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 월 별 일정을 전체 조회합니다. ### Path Variable - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Intro - Schedules
   * @name GetClubSchedules
   * @summary [동아리 소개] 동아리 월 별 일정
   * @request GET:/api/clubs/{clubId}/schedules
   * @secure
   */
  getClubSchedules = (
    { clubId, ...query }: GetClubSchedulesParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubScheduleResponse, any>({
      path: `/api/clubs/${clubId}/schedules`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 모집 안내를 조회합니다. - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Intro - Recruitment
   * @name GetClubRecruitment
   * @summary [동아리 모집 안내] 동아리 모집 안내 조회
   * @request GET:/api/clubs/{clubId}/recruitment
   * @secure
   */
  getClubRecruitment = (
    { clubId, ...query }: GetClubRecruitmentParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubRecruitmentResponse, any>({
      path: `/api/clubs/${clubId}/recruitment`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리  오버뷰 정보를 조회합니다. - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Detail
   * @name GetSpecificClubOverview
   * @summary [동아리 정보] 동아리 오버뷰 정보 조회
   * @request GET:/api/clubs/{clubId}/overview
   * @secure
   */
  getSpecificClubOverview = (
    { clubId, ...query }: GetSpecificClubOverviewParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubOverviewResponse, any>({
      path: `/api/clubs/${clubId}/overview`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 소개글을 조회합니다. - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Intro - Introduction
   * @name GetClubIntroduction
   * @summary [동아리 소개] 동아리 소개 조회
   * @request GET:/api/clubs/{clubId}/introduction
   * @deprecated
   * @secure
   */
  getClubIntroduction = (
    { clubId, ...query }: GetClubIntroductionParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubIntroductionResponse, any>({
      path: `/api/clubs/${clubId}/introduction`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 기본 정보 를 조회합니다. - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Detail
   * @name GetSpecificClubBasicInfo
   * @summary [동아리 정보] 동아리 기본 정보 조회
   * @request GET:/api/clubs/{clubId}/info
   * @deprecated
   * @secure
   */
  getSpecificClubBasicInfo = (
    { clubId, ...query }: GetSpecificClubBasicInfoParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubBasicInfoResponse, any>({
      path: `/api/clubs/${clubId}/info`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 상세 정보를 조회합니다. - **clubId**: 조회할 동아리의 ID
   *
   * @tags Club Detail
   * @name GetSpecificClubDraft
   * @summary [동아리 상세] 임시 저장된 동아리 상세 정보 조회
   * @request GET:/api/clubs/{clubId}/draft
   * @secure
   */
  getSpecificClubDraft = (
    { clubId, ...query }: GetSpecificClubDraftParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubDetailDraftResponse, any>({
      path: `/api/clubs/${clubId}/draft`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 연합 동아리를 검색합니다. - **keyword**: 동아리 이름에서 검색할 키워드 - **status**: 동아리 모집 상태 - **sortBy**: 정렬 기준 - **category**: 연합 동아리 카테고리 ### 모든 조건은 선택적으로 입력할 수 있습니다. (필수 X) 아무 값도 입력 하지 않을 경우, 가나다순으로 정렬하여 전체 연합 동아리를 조회합니다. page의 기본 값은 0, size의 기본 값은 10입니다.
   *
   * @tags Club Search v2
   * @name GetUnionClubsByCondition
   * @summary [동아리 검색] 연합 동아리 검색
   * @request GET:/api/clubs/union
   * @secure
   */
  getUnionClubsByCondition = (
    query: GetUnionClubsByConditionParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubSearchResponse, any>({
      path: `/api/clubs/union`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Club Registration
   * @name GetClubAdminDetail
   * @summary [서비스 어드민] 동아리 관리 상세 조회
   * @request GET:/api/clubs/service-admin/{clubId}
   * @secure
   */
  getClubAdminDetail = (
    { clubId, ...query }: GetClubAdminDetailParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubAdminDetailResponse, any>({
      path: `/api/clubs/service-admin/${clubId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리를 삭제합니다. ### PathVariable - **clubId**: 삭제하려는 club의 ID ### Response - 없음
   *
   * @tags Club Registration
   * @name DeleteClub
   * @summary [동아리 삭제] 동아리 삭제
   * @request DELETE:/api/clubs/service-admin/{clubId}
   * @secure
   */
  deleteClub = (
    { clubId, ...query }: DeleteClubParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/clubs/service-admin/${clubId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 수정 요청을 조회합니다.
   *
   * @tags Club Basic
   * @name GetClubUpdateList
   * @summary [동아리 수정] 동아리 수정 요청 조회
   * @request GET:/api/clubs/service-admin/update
   * @secure
   */
  getClubUpdateList = (
    query: GetClubUpdateListParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubSearchResponse, any>({
      path: `/api/clubs/service-admin/update`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 등록 요청된 동아리를 조회합니다. ### Response - clubRegistrationDTOList: 등록 요청한 동아리 리스트
   *
   * @tags Club Registration
   * @name GetAllClubRegistrations
   * @summary [동아리 등록] 등록 요청 동아리 조회
   * @request GET:/api/clubs/service-admin/registrations
   * @secure
   */
  getAllClubRegistrations = (
    query: GetAllClubRegistrationsParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetRegistrationsResponse, any>({
      path: `/api/clubs/service-admin/registrations`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 최근 업데이트된 동아리를 3개 조회합니다.
   *
   * @tags Club Search v2
   * @name GetRecentUpdatedClubs
   * @summary [동아리 검색] 최근 업데이트된 동아리 조회
   * @request GET:/api/clubs/recent
   * @secure
   */
  getRecentUpdatedClubs = (params: RequestParams = {}) =>
    this.request<ApiResponseClubSearchResponse, any>({
      path: `/api/clubs/recent`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 인기 동아리를 검색합니다.
   *
   * @tags Club Search v2
   * @name GetPopularClubs
   * @summary [동아리 검색] 인기 동아리 검색
   * @request GET:/api/clubs/popular
   * @secure
   */
  getPopularClubs = (
    query: GetPopularClubsParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubSearchResponse, any>({
      path: `/api/clubs/popular`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags club-instagram-search-controller
   * @name GetInstagram
   * @request GET:/api/clubs/instagram
   * @secure
   */
  getInstagram = (query: GetInstagramParams, params: RequestParams = {}) =>
    this.request<ApiResponseGetInstagrams, any>({
      path: `/api/clubs/instagram`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags club-instagram-search-controller
   * @name GetInstagramUnion
   * @request GET:/api/clubs/instagram/union
   * @secure
   */
  getInstagramUnion = (
    query: GetInstagramUnionParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetInstagrams, any>({
      path: `/api/clubs/instagram/union`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags club-instagram-search-controller
   * @name GetInstagramMain
   * @request GET:/api/clubs/instagram/main
   * @secure
   */
  getInstagramMain = (params: RequestParams = {}) =>
    this.request<ApiResponseGetInstagramsMain, any>({
      path: `/api/clubs/instagram/main`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags club-instagram-search-controller
   * @name GetInstagramDepartment
   * @request GET:/api/clubs/instagram/department
   * @secure
   */
  getInstagramDepartment = (
    query: GetInstagramDepartmentParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetInstagrams, any>({
      path: `/api/clubs/instagram/department`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags club-instagram-search-controller
   * @name GetInstagramCollege
   * @request GET:/api/clubs/instagram/college
   * @secure
   */
  getInstagramCollege = (
    query: GetInstagramCollegeParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetInstagrams, any>({
      path: `/api/clubs/instagram/college`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags club-instagram-search-controller
   * @name GetInstagramCentral
   * @request GET:/api/clubs/instagram/central
   * @secure
   */
  getInstagramCentral = (
    query: GetInstagramCentralParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetInstagrams, any>({
      path: `/api/clubs/instagram/central`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리의 ID를 전체 조회합니다.
   *
   * @tags Club Overview
   * @name GetAllClubIds
   * @summary [동아리 조회] 동아리 ID 전체 조회
   * @request GET:/api/clubs/ids
   * @secure
   */
  getAllClubIds = (params: RequestParams = {}) =>
    this.request<ApiResponseClubIdResponse, any>({
      path: `/api/clubs/ids`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 중앙 동아리를 검색합니다. - **keyword**: 동아리 이름에서 검색할 키워드 - **status**: 동아리 모집 상태 - **sortBy**: 정렬 기준 - **college**: 단과대 카테고리 - **department**: 학과 카테고리 ### 모든 조건은 선택적으로 입력할 수 있습니다. (필수 X) 아무 값도 입력 하지 않을 경우, 가나다순으로 정렬하여 전체 중앙 동아리를 조회합니다. page의 기본 값은 0, size의 기본 값은 10입니다.
   *
   * @tags Club Search v2
   * @name GetCentralClubsByCondition
   * @summary [동아리 검색] 학과 동아리 검색
   * @request GET:/api/clubs/department
   * @secure
   */
  getCentralClubsByCondition = (
    query: GetCentralClubsByConditionParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubSearchResponse, any>({
      path: `/api/clubs/department`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 중앙 동아리를 검색합니다. - **keyword**: 동아리 이름에서 검색할 키워드 - **status**: 동아리 모집 상태 - **sortBy**: 정렬 기준 - **college**: 단과대 카테고리 ### 모든 조건은 선택적으로 입력할 수 있습니다. (필수 X) 아무 값도 입력 하지 않을 경우, 가나다순으로 정렬하여 전체 단과대 동아리를 조회합니다. page의 기본 값은 0, size의 기본 값은 10입니다.
   *
   * @tags Club Search v2
   * @name GetCollageClubsByCondition
   * @summary [동아리 검색] 단과대 동아리 검색
   * @request GET:/api/clubs/college
   * @secure
   */
  getCollageClubsByCondition = (
    query: GetCollageClubsByConditionParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubSearchResponse, any>({
      path: `/api/clubs/college`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 중앙 동아리를 검색합니다. - **keyword**: 동아리 이름에서 검색할 키워드 - **status**: 동아리 모집 상태 - **sortBy**: 정렬 기준 - **category**: 중앙 동아리 카테고리 ### 모든 조건은 선택적으로 입력할 수 있습니다. (필수 X) 아무 값도 입력 하지 않을 경우, 가나다순으로 정렬하여 전체 중앙 동아리를 조회합니다. page의 기본 값은 0, size의 기본 값은 10입니다.
   *
   * @tags Club Search v2
   * @name GetCentralClubsByCondition1
   * @summary [동아리 검색] 중앙 동아리 검색
   * @request GET:/api/clubs/central
   * @secure
   */
  getCentralClubsByCondition1 = (
    query: GetCentralClubsByCondition1Params,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseClubSearchResponse, any>({
      path: `/api/clubs/central`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description ## 총동연 공지사항을 전부 조회합니다. ### Response #### AnnouncementDTOList - **AnnouncementDTO** 객체들의 리스트 #### AnnouncementDTO - **announcementId**: 공지사항 ID - **title**: 공지사항 제목 - **date**: 공지 날짜 - **url**: 관련 링크 - **thumbnail**: 썸네일 이미지 링크
   *
   * @tags Announcements
   * @name GetAllAnnouncement
   * @summary [총동연 공지사항] 총동연 공지사항 전체 조회
   * @request GET:/api/announcements
   * @secure
   */
  getAllAnnouncement = (params: RequestParams = {}) =>
    this.request<ApiResponseGetAllAnnouncementResponse, any>({
      path: `/api/announcements`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 활동로그 하나를 상세조회합니다. ### PathVariable #### activityId: 상세조회할 activity의 ID ### Response #### **activityThumbnailDTOList** - **content**: 활동로그 내용 - **date**: 활동로그 날짜 - **activityImageDTOList**: activityImageDTO 객체들의 리스트 #### **activityThumbnailDTO** - **orderIndex**: 해당 이미지의 순서(0부터 시작) - **imageUrl**: 해당 이미지의 url
   *
   * @tags Activity Logs
   * @name GetSpecificActivity
   * @summary [활동로그] 활동로그 상세 조회
   * @request GET:/api/activities/{activityId}
   * @secure
   */
  getSpecificActivity = (
    { activityId, ...query }: GetSpecificActivityParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetSpecificActivityResponse, any>({
      path: `/api/activities/${activityId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리의 활동로그를 모두 조회합니다. ### PathVariable #### clubId: 활동로그를 조회할 club의 ID ### Response #### **activityThumbnailDTOList** - **activityId**: activity의 id - **thumbnailUrl**: 활동로그의 가장 첫 이미지의 url
   *
   * @tags Activity Logs
   * @name GetAllActivity
   * @summary [활동로그] 활동로그 조회
   * @request GET:/api/activities/club/{clubId}
   * @secure
   */
  getAllActivity = (
    { clubId, ...query }: GetAllActivityParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseGetAllActivityResponse, any>({
      path: `/api/activities/club/${clubId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 최근 업로드 된 활동로그를 조회합니다..
   *
   * @tags Activity Logs
   * @name GetRecentActivities
   * @summary [활동로그] 최근 업로드 된 활동로그 조회
   * @request GET:/api/activities/club/recent
   * @secure
   */
  getRecentActivities = (params: RequestParams = {}) =>
    this.request<ApiResponseRecentActivityLogResponse, any>({
      path: `/api/activities/club/recent`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description ## 동아리 월 별 일정을 삭제합니다. ### Path Variable - **clubId**: 삭제할 동아리의 ID - **scheduleId**: 삭제할 일정의 ID
   *
   * @tags Club Intro - Schedules
   * @name DeleteClubSchedules
   * @summary [동아리 소개] 동아리 월 별 일정 삭제
   * @request DELETE:/api/clubs/club-admin/{clubId}/schedules/{scheduleId}
   * @secure
   */
  deleteClubSchedules = (
    { clubId, scheduleId, ...query }: DeleteClubSchedulesParams,
    params: RequestParams = {},
  ) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/clubs/club-admin/${clubId}/schedules/${scheduleId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
