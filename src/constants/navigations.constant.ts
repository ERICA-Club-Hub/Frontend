import { PATHS } from '@/routes/paths';
import { ADMIN_TYPE, AdminType } from '@/types/admin.types';

export interface AppHeaderMenuType {
    label: string;
    adminType: AdminType;
    url?: string;
}

// --- Drawer 메뉴 리스트 ---
/* 기본 메뉴 리스트 */
export const baseMenus: AppHeaderMenuType[] = [
    {
        label: '공지사항',
        adminType: null,
        url: PATHS.NOTICE,
    },
    {
        label: '자주 묻는 질문',
        adminType: null,
        url: PATHS.FAQ,
    },
];
/* 어드민 타입에 따른 메뉴 리스트 */
export const adminMenus: AppHeaderMenuType[] = [
    {
        // --- 서비스 어드민 ---
        label: '어드민 페이지',
        adminType: ADMIN_TYPE.SERVICE,
        url: PATHS.ADMIN_SERVICE,
    },
    {
        // --- 동아리 어드민 ---
        label: '어드민 페이지',
        adminType: ADMIN_TYPE.CLUB,

        /* clubId는 PATHS에서 직접 동적 라우팅으로 처리
         * 0은 더미 데이터
         */
        url: PATHS.CLUB_ADMIN_DASHBOARD(0),
    },
];

// --- 어드민 대시보드 페이지 메뉴 리스트 ---
/* 서비스 어드민 대시보드 페이지 */
export const serviceAdminMenus = [
    {
        label: '신규 동아리 등록 신청 확인하기',
        url: PATHS.SERVICE_ADMIN_REGISTRATIONS_MANAGE,
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
        label: '동아리 기본 정보 관리',
        description: '동아리 이름, 한줄 소개, 동아리 소속, 대표 사진 등',
        url: PATHS.CLUB_ADMIN_PROFILE(clubId),
    },
    {
        label: '상세 페이지 관리',
        description: '동아리 상세 페이지에 나오는 모든 정보 관리',
        url: PATHS.CLUB_ADMIN_DETAIL(clubId),
    },
];

export const clubDetailRegisterNavigations = [
    { id: 1, nav: '요약 정보' },
    { id: 2, nav: '동아리 소개' },
    { id: 3, nav: '모집안내' },
];
