export const PATHS = {
    /*메인 페이지 */
    HOME: '/',

    /* 동아리 상세 페이지 */
    CLUB_DETAIL: (clubId?: number) => `/club/${clubId}`,

    /* 동아리 활동 로그 상세 페이지 */
    CLUB_ACTIVITY_DETAIL: (
        clubId?: number | string,
        activityId?: number | string,
    ) => `/club/${clubId}/${activityId}`,

    /* 동아리 소셜(인스타) 페이지 */
    CLUB_SOCIAL: '/club/social',

    /* 서비스 공지사항 */
    NOTICE: '/notice',

    /* 자주 묻는 질문 */
    FAQ: '/faq',

    // --- 동아리 등록 ---
    CLUB_REGISTRATION: '/club/registration',
    CLUB_REGISTRATION_COMPLETED: '/club/registration/completed',

    // --- 어드민 로그인 ---
    ADMIN_LOGIN: '/admin/login',

    // TODO: 어드민 어순 변경 e.g. ADMIN_SERVICE -> SERVICE_ADMIN
    // --- 서비스 어드민 ---
    /* 대시보드 */
    ADMIN_SERVICE: '/admin/service',

    /* 신규 동아리 등록 신청 관리 */
    SERVICE_ADMIN_REGISTRATIONS_MANAGE: '/admin/service/registrations',

    /* 동아리 관리 */
    ADMIN_SERVICE_CLUB_MANAGE: '/admin/service/club-management',

    /* 동아리 디테일 페이지 */
    ADMIN_SERVICE_CLUB_DETAIL: (clubId: number) =>
        `/admin/service/registrations/${clubId}`,

    /* 서비스 공지사항*/
    ADMIN_SERVICE_NOTICE: '/admin/service/notice',

    /* 자주 묻는 질문 */
    ADMIN_SERVICE_FAQ: '/admin/service/faq',

    // TODO: 어드민 어순 변경 e.g. ADMIN_CLUB -> CLUB_ADMIN
    // --- 동아리 어드민 ---
    /* 동아리 등록 정보 수정 */
    CLUB_ADMIN_REGISTRATION_EDIT: `/admin/club/:id/registration/edit`,

    /* 대시보드 */
    CLUB_ADMIN_DASHBOARD: (clubId: number) => `/admin/club/${clubId}`,

    /* 동아리 기본 정보 관리 */
    CLUB_ADMIN_PROFILE: (clubId: number) => `/admin/club/${clubId}/profile`,

    /* 동아리 상세페이지 관리 */
    CLUB_ADMIN_DETAIL: (clubId: number) => `/admin/club/${clubId}/detail`,
};
