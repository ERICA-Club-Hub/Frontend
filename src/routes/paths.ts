import { ADMIN_TYPE } from '@/types/admin.types';
import { DrawerMenuType } from '@/types/routes.types';

export const PATHS = {
    /* 동아리 상세 페이지 */
    CLUB_DETAIL: (clubId?: number) => `/club/${clubId}`,

    /* 자료실 */
    RESOURCES: '/resources',

    /* 서비스 공지사항 */
    NOTICE: '/notice',

    /* 자주 묻는 질문 */
    FAQ: '/faq',

    // --- 어드민 대시보드 페이지 ---
    ADMIN_SERVICE: '/admin/service',
    ADMIN_CLUB: (clubId: number) => `/admin/club/${clubId}`,

    // --- 서비스 어드민 대시보드 ---
    /* (신규) 동아리 등록 신청 관리 */
    ADMIN_SERVICE_REVIEW_REGISTRATIONS: '/admin/service/registrations',

    /* 동아리 관리 */
    ADMIN_SERVICE_CLUB_MANAGE: '/admin/service/club-management',

    /* 동아리 디테일 페이지 */
    ADMIN_SERVICE_CLUB_DETAIL: (clubId: number) =>
        `/admin/service/registrations/${clubId}`,

    /* 서비스 공지사항*/
    ADMIN_SERVICE_NOTICE: '/admin/service/notice',

    /* 자주 묻는 질문 */
    ADMIN_SERVICE_FAQ: '/admin/service/faq',

    // --- 동아리 어드민 대시보드 ---
    /* 동아리 상세페이지 설정 */
    ADMIN_CLUB_SUMMARY_INFO: (clubId: number) =>
        `/admin/club/${clubId}/summary-info`,

    /* 동아리 활동로그 작성 */
    ADMIN_CLUB_ACTIVITIES_FEED: (clubId: number) =>
        `/admin/club/${clubId}/activities/feed`,

    /* 동아리 등록 정보 수정 */
    ADMIN_CLUB_REGISTER_EDIT: (clubId: number) =>
        `/admin/club/${clubId}/register/edit`,
};

// --- Drawer 메뉴 리스트 ---
/* 기본 메뉴 리스트 */
export const baseMenus: DrawerMenuType[] = [
    {
        title: '자료실',
        adminType: null,
        url: PATHS.RESOURCES,
    },
    {
        title: '서비스 공지사항',
        adminType: null,
        url: PATHS.NOTICE,
    },
    {
        title: '자주 묻는 질문',
        adminType: null,
        url: PATHS.FAQ,
    },
];
/* 어드민 타입에 따른 메뉴 리스트 */
export const adminMenus: DrawerMenuType[] = [
    {
        // --- 서비스 어드민 ---
        title: '어드민 페이지',
        adminType: ADMIN_TYPE.SERVICE,
        url: PATHS.ADMIN_SERVICE,
    },
    {
        // --- 동아리 어드민 ---
        title: '어드민 페이지',
        adminType: ADMIN_TYPE.CLUB,

        /* clubId는 PATHS에서 직접 동적 라우팅으로 처리
         * 0은 더미 데이터
         */
        url: PATHS.ADMIN_CLUB(0),
    },
];

// --- 어드민 대시보드 페이지 메뉴 리스트 ---
/* 서비스 어드민 대시보드 페이지 */
export const serviceAdminMenus = [
    {
        label: '신규 동아리 등록 신청 확인하기',
        url: PATHS.ADMIN_SERVICE_REVIEW_REGISTRATIONS,
    },
    {
        label: '동아리 관리하기',
        url: PATHS.ADMIN_SERVICE_CLUB_MANAGE,
    },
    {
        label: '서비스 공지사항 관리하기',
        url: PATHS.ADMIN_SERVICE_NOTICE,
    },
    {
        label: '자주 묻는 질문 관리하기',
        url: PATHS.ADMIN_SERVICE_FAQ,
    },
];
/* 동아리 어드민 대시보드 페이지 */
export const getClubAdminMenus = (clubId: number) => [
    {
        label: '동아리 상세페이지 설정하기',
        url: PATHS.ADMIN_CLUB_SUMMARY_INFO(clubId),
    },
    {
        label: '동아리 활동로그 작성하기',
        url: PATHS.ADMIN_CLUB_ACTIVITIES_FEED(clubId),
    },
    {
        label: '동아리 등록 정보 수정하기',
        url: PATHS.ADMIN_CLUB_REGISTER_EDIT(clubId),
    },
];
