import { ADMIN_TYPE } from '@/types/admin.types';
import { DrawerMenuType } from '@/types/routes.types';

export const PATHS = {
    RESOURCES: '/resources',
    NOTICE: '/notice',
    FAQ: '/faq',

    // --- 어드민 대시보드 페이지 url ---
    ADMIN_SERVICE: '/admin/service',
    ADMIN_CLUB: (clubId: number) => `/admin/club/${clubId}`,

    // --- 서비스 어드민 대시보드 ---
    /* (신규) 동아리 등록 신청 관리 */
    ADMIN_SERVICE_PENDING_REGISTRATIONS: '/admin/service/register/manage',

    /* 동아리 관리 */
    ADMIN_SERVICE_CLUB_MANAGE: '/admin/service/club/manage',

    /* 서비스 공지사항*/
    ADMIN_SERVICE_NOTICE: '/admin/service/notice',

    /* 자주 묻는 질문 */
    ADMIN_SERVICE_FAQ: '/admin/service/faq',
};

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

// 어드민 타입에 따른 메뉴 리스트
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

        /* clubId는 동적 라우팅으로 처리
         * 0은 더미 데이터
         */
        url: PATHS.ADMIN_CLUB(0),
    },
];

// 어드민 서비스 대시보드 페이지
export const adminService = [
    {
        label: '신규 동아리 등록 신청 확인하기',
        url: PATHS.ADMIN_SERVICE_PENDING_REGISTRATIONS,
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
